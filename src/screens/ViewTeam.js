import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import {Button} from 'react-native-paper';
import database from '@react-native-firebase/database';

import PokeCard from '../components/PokeCard';

const ViewTeam = (props) => {
  const team = props.route?.params.team;
  const [region, setRegion] = useState();

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
      <View
        style={{
          height: '10%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontFamily: 'OpenSans-Regular',
            fontSize: 24,
            fontWeight: 'bold',
          }}>
          {team.teamName}
        </Text>
      </View>
      <View style={{height: '80%'}}>
        <FlatList
          data={team?.pokemons}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <PokeCard pokemon={item} isViewing />}
        />
      </View>
      <View
        style={{
          height: '10%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <View style={{height: 50, width: 150}}>
          <Button
            mode="contained"
            contentStyle={{width: '100%', height: '100%'}}
            onPress={() => {
              props.navigation.navigate('TeamsManagementScreen', {
                selectedPokemons: team.pokemons,
                isEditing: true,
                region,
                teamName: team.teamName,
                collectionId: team.id,
              });
            }}
            color="#27B7ED">
            Editar
          </Button>
        </View>
        <View style={{height: 50, width: 150}}>
          <Button
            mode="contained"
            contentStyle={{width: '100%', height: '100%'}}
            onPress={async () => {
              Alert.alert(
                'Warning',
                'Would you like to continue deleting this team?',
                [
                  {text: 'Cancel'},
                  {
                    text: 'Confirm',
                    onPress: async () => {
                      await database().ref(`/teams/${team.id}`).remove();
                      props.navigation.push('TeamsScreen');
                    },
                  },
                ],
              );
            }}
            color="red">
            Eliminar
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
});
export default ViewTeam;
