import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import database from '@react-native-firebase/database';

import PokeCard from '../components/PokeCard';
import {fetchPokemonsSuccess} from '../redux/actions/pokemons';

const TeamsManagement = (props) => {
  const region = props.route.params?.region;
  const dispatch = useDispatch();

  const pokemons = useSelector((state) => state.pokemons.pokemons);
  const loading = useSelector((state) => state.pokemons.isLoading);

  useEffect(() => {
    const getPokemons = () => dispatch(fetchPokemonsSuccess(region));
    getPokemons();
  }, [dispatch, region]);

  const isEditing = props.route.params?.isEditing;
  const selectedPokemons = props.route.params?.selectedPokemons;
  const fetchedTeamName = props.route.params?.teamName;
  const teamId = props.route.params?.collectionId;

  const [selectedValues, setSelectedValues] = useState(
    selectedPokemons ? selectedPokemons : [],
  );

  const user = useSelector((state) => state.auth.userData);

  const [teamName, setTeamName] = useState('' || fetchedTeamName);

  const newReference = database().ref('/teams');
  const handleSubmit = () => {
    const payload = {
      teamName: teamName,
      user: user.email,
      pokemons: selectedValues,
      region: region.name,
    };

    console.log('Payload', payload);

    if (isEditing) {
      database()
        .ref(`/teams/${teamId}`)
        .update({
          pokemons: selectedValues,
          teamName: teamName,
        })
        .then(() => console.log('Data updated.'));
    } else {
      newReference.push(payload).then(() => console.log('Data updated.'));
    }

    setTeamName('');
    setSelectedValues([]);
    props.navigation.push('TeamsScreen');
  };

  return (
    <View style={styles.screen}>
      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator color="blue" size="large" />
        </View>
      ) : (
        <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
              width: '90%',
              height: '12%',
            }}>
            <Text>Enter team name:</Text>
            <TextInput
              mode="outlined"
              placeholder="E.g: 'OP Team'"
              style={{width: 250, marginLeft: 15}}
              value={teamName}
              onChangeText={(text) => setTeamName(text)}
              autoCapitalize="words"
            />
          </View>
          <View
            style={{
              width: '90%',
              marginTop: 10,
              height: '75%',
            }}>
            <FlatList
              numColumns={2}
              contentContainerStyle={{paddingVertical: 20}}
              data={pokemons}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) => (
                <PokeCard
                  pokemon={item}
                  setSelectedValues={setSelectedValues}
                  selectedValues={selectedValues}
                />
              )}
            />
          </View>
          <View style={{height: '10%', width: '100%'}}>
            <Button
              onPress={handleSubmit}
              mode="contained"
              contentStyle={{width: '100%', height: '100%'}}
              disabled={selectedValues.length < 3 || !teamName}>
              Save
            </Button>
          </View>
        </View>
      )}
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
export default TeamsManagement;
