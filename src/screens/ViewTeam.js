import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Alert} from 'react-native';
import {Button} from 'react-native-paper';
import database from '@react-native-firebase/database';

import PokeCard from '../components/PokeCard';
import Colors from '../constants/Colors';

const ViewTeam = (props) => {
  const team = props.route?.params.team;
  const [region, setRegion] = useState();

  const {navigation} = props;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: team.teamName,
    });
  }, [navigation]);

  useEffect(() => {
    if (team?.region) {
      const fetchRegion = async () =>
        await fetch(`https://pokeapi.co/api/v2/region/${team?.region}/`)
          .then((res) => {
            return res.json();
          })
          .then((resp) => {
            setRegion(resp);
          });

      fetchRegion();
    }
  }, [team]);

  return (
    <View style={styles.screen}>
      <View style={styles.listContainer}>
        <FlatList
          data={team?.pokemons}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <PokeCard pokemon={item} isViewing />}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            contentStyle={{width: '100%', height: '100%'}}
            onPress={() => {
              props.navigation.push('TeamsManagementScreen', {
                selectedPokemons: team.pokemons,
                isEditing: true,
                region,
                teamName: team.teamName,
                collectionId: team.id,
              });
            }}
            labelStyle={{color: '#fff'}}
            color="#27B7ED">
            EDIT
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            contentStyle={{width: '100%', height: '100%'}}
            onPress={() => {
              Alert.alert(
                'Warning',
                'Would you like to continue deleting this team?',
                [
                  {text: 'Cancel'},
                  {
                    text: 'Confirm',
                    onPress: async () => {
                      await database()
                        .ref(`/teams/${team.id}`)
                        .remove()
                        .then(() =>
                          props.navigation.push('Home', {
                            screen: 'TeamsScreen',
                          }),
                        );
                    },
                  },
                ],
              );
            }}
            color={Colors.primary}>
            DELETE
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  listContainer: {height: '85%', marginVertical: 10},
  buttonsContainer: {
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonContainer: {height: '80%', width: 150},
});
export default ViewTeam;
