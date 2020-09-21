import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View, Modal, FlatList} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {useDispatch, useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/Entypo';

import {fetchRegions} from '../redux/actions/regions';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';

const MyModal = ({openModal, toggleModal, ...props}) => {
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
            height: '25%',
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

  useEffect(() => {
    const getRegions = () => dispatch(fetchRegions());
    getRegions();

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
            .filter((val) => val),
        );
      });
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
        <Text>Pick a Region:</Text>

        <View
          style={{
            borderRadius: 10,
            borderColor: '#ccc',
            borderWidth: 1,
            height: 50,
            width: '50%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 10,
            marginVertical: 15,
          }}>
          <Picker
            selectedValue={selectedRegion}
            style={{
              width: '100%',
              height: '100%',
            }}
            onValueChange={(itemValue) => setSelectedRegion(itemValue)}
            mode="dropdown">
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
        <Button
          title="Start"
          onPress={() => {
            toggleModal();
            props.navigation.navigate('TeamsManagementScreen', {
              region: region,
            });
            setSelectedRegion(null);
          }}
          disabled={selectedRegion === null}
        />
      </MyModal>

      <View style={{width: '100%', flex: 1, marginVertical: 10}}>
        {teams.length !== 0 ? (
          <View style={{flex: 1}}>
            <View
              style={{
                height: '10%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>Keep adding new teams!</Text>
            </View>

            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{width: '50%'}}>
                <Button title="Add Team" onPress={() => toggleModal()} />
              </View>
            </View>

            <View style={{paddingHorizontal: 10, marginVertical: 10}}>
              <Text>My Teams</Text>
            </View>

            <FlatList
              style={{width: '100%' /*  backgroundColor: 'red' */}}
              data={teams.length > 0 && teams}
              renderItem={({item}) => (
                <View
                  style={{
                    margin: 10,
                    overflow: 'hidden',
                    borderRadius: 10,
                    elevation: 5,
                  }}>
                  <TouchableNativeFeedback
                    style={{borderRadius: 10}}
                    useForeground
                    onPress={() =>
                      props.navigation.navigate('ViewTeam', {
                        team: item,
                      })
                    }>
                    <View
                      style={{
                        backgroundColor: '#fff',
                        padding: 10,
                        borderRadius: 10,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <View>
                          <Text>{item.teamName}</Text>
                          <Text style={{textTransform: 'capitalize'}}>
                            {item.region}
                          </Text>
                        </View>

                        <Icon name="chevron-right" size={24} color="#000" />
                      </View>
                    </View>
                  </TouchableNativeFeedback>
                </View>
              )}
            />
          </View>
        ) : (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>No teams added yet. Start adding some!</Text>
            <View style={{width: 150, justifyContent: 'center'}}>
              <Button title="Add Team" onPress={() => toggleModal()} />
            </View>
          </View>
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
});

export default Teams;
