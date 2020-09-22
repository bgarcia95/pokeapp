import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {useDispatch, useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/Entypo';

import {fetchRegions} from '../redux/actions/regions';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';

const MyModal = ({openModal, toggleModal, ...props}) => {
  const {width, height} = Dimensions.get('window');

  return (
    <Modal
      visible={openModal}
      onRequestClose={toggleModal}
      transparent
      animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.2)',
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: height <= 592 ? '35%' : '25%',
            padding: 30,
            backgroundColor: '#fff',
            margin: 20,
            borderRadius: 10,
            alignItems: 'center',
          }}>
          {props.children}
        </View>
      </View>
    </Modal>
  );
};

const Teams = (props) => {
  const dispatch = useDispatch();

  const [region, setRegion] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => setOpenModal((prevState) => !prevState);

  const regions = useSelector((state) => state.regions.regions);

  const [teams, setTeams] = useState([]);

  const loggedUser = useSelector((state) => state.auth.userData.email);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getRegions = () => dispatch(fetchRegions());
    getRegions();

    setIsLoading(true);
    const loadTeams = () => {
      database()
        .ref('/teams')
        .on('value', (snapshot) => {
          setTeams(
            Object.keys(snapshot.val())
              .map((el) =>
                snapshot.val()[el].user === loggedUser
                  ? {
                      id: el,
                      ...snapshot.val()[el],
                    }
                  : null,
              )
              .filter((val) => val)
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime(),
              ),
          );
          setIsLoading(false);
        });
    };

    loadTeams();
  }, []);

  useEffect(() => {
    if (selectedRegion !== null) {
      const fetchRegion = async () =>
        await fetch(`https://pokeapi.co/api/v2/region/${selectedRegion}/`)
          .then((res) => {
            return res.json();
          })
          .then((resp) => {
            setRegion(resp);
          });

      fetchRegion();
    }
  }, [selectedRegion]);

  const regionsDDData = regions?.map((region) => ({
    label: region.name.toUpperCase(),
    value: region.name,
  }));

  return (
    <View style={styles.screen}>
      <MyModal openModal={openModal} toggleModal={toggleModal}>
        <Text style={styles.modalText}>Pick a Region:</Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedRegion}
            style={{
              width: '100%',
              height: '100%',
            }}
            onValueChange={(itemValue) => setSelectedRegion(itemValue)}
            mode="dialog">
            <Picker.Item label="NONE" value={null} />
            {regionsDDData.map((item) => (
              <Picker.Item
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.startButton}>
          <Button
            contentStyle={{width: '100%', height: '100%'}}
            onPress={() => {
              toggleModal();
              props.navigation.navigate('TeamsManagementScreen', {
                region: region,
              });
              setSelectedRegion(null);
            }}
            disabled={selectedRegion === null}
            mode="contained"
            color="#CF823E"
            labelStyle={{color: '#fff'}}>
            Start
          </Button>
        </View>
      </MyModal>

      <View style={styles.mainScreen}>
        {isLoading && (
          <View style={styles.screen}>
            <ActivityIndicator size="large" color="red" />
          </View>
        )}
        {teams.length !== 0 && !isLoading ? (
          <View style={{height: '100%', width: '100%', alignItems: 'center'}}>
            <View style={styles.myTeamsLabelWrapper}>
              <Text style={styles.myTeamsLabel}>My Teams</Text>
            </View>

            <View style={styles.listContainer}>
              <FlatList
                data={teams.length > 0 && teams}
                renderItem={({item}) => (
                  <View style={styles.itemContainer}>
                    <TouchableNativeFeedback
                      style={{borderRadius: 10}}
                      useForeground
                      onPress={() =>
                        props.navigation.navigate('ViewTeam', {
                          team: item,
                        })
                      }>
                      <View style={styles.itemContent}>
                        <View>
                          <Text styles={styles.teamName}>{item.teamName}</Text>
                          <Text style={styles.region}>{item.region}</Text>
                        </View>
                        <Icon name="chevron-right" size={24} color="#000" />
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                )}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                onPress={() => toggleModal()}
                mode="contained"
                color="#27B7ED"
                labelStyle={styles.buttonLabelStyle}
                contentStyle={{width: '100%', height: '100%'}}>
                Add New Team
              </Button>
            </View>
          </View>
        ) : (
          teams.length === 0 &&
          !isLoading && (
            <View style={styles.screen}>
              <Text style={styles.noTeams}>
                No teams added yet. Start adding some!
              </Text>
              <View style={styles.buttonContainer}>
                <Button
                  onPress={() => toggleModal()}
                  mode="contained"
                  color="#27B7ED"
                  labelStyle={styles.buttonLabelStyle}
                  contentStyle={{width: '100%', height: '100%'}}>
                  Add New Team
                </Button>
              </View>
            </View>
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainScreen: {width: '100%', flex: 1, marginVertical: 10},
  pickerContainer: {
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    height: 50,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  modalText: {fontFamily: 'OpenSans-Regular', fontSize: 18},
  startButton: {width: '50%', height: 40},
  messageWrapper: {
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '50%',
    height: 50,
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonLabelStyle: {
    color: '#fff',
    fontFamily: 'OpenSans-Regular',
    fontWeight: 'bold',
  },
  myTeamsLabelWrapper: {
    paddingLeft: 15,
    marginVertical: 20,
    width: '100%',
    alignItems: 'flex-start',
  },
  myTeamsLabel: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  listContainer: {height: '80%', width: '100%'},
  itemContainer: {
    margin: 10,
    overflow: 'hidden',
    borderRadius: 10,
    elevation: 5,
  },
  itemContent: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamName: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 24,
  },
  region: {
    color: 'gray',
    textTransform: 'capitalize',
  },
  noTeams: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 18,
    marginVertical: 10,
  },
});

export default Teams;
