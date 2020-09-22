import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import database from '@react-native-firebase/database';

import PokeCard from '../components/PokeCard';
import {fetchPokemonsSuccess} from '../redux/actions/pokemons';
import Colors from '../constants/Colors';

const TeamsManagement = (props) => {
  const region = props.route.params?.region;
  const dispatch = useDispatch();

  const pokemons = useSelector((state) => state.pokemons.pokemons);
  const loading = useSelector((state) => state.pokemons.isLoading);

  const {navigation} = props;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Manage your team',
    });
  }, [navigation]);

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

    if (isEditing) {
      Alert.alert('Warning', 'Do you want to continue saving these changes?', [
        {text: 'NO', style: 'cancel'},
        {
          text: 'YES',
          onPress: () =>
            database()
              .ref(`/teams/${teamId}`)
              .update({
                pokemons: selectedValues,
                teamName: teamName,
              })
              .then(() => {
                setTeamName('');
                setSelectedValues([]);
                props.navigation.push('Home', {screen: 'TeamsScreen'});
              }),
        },
      ]);
    } else {
      Alert.alert('Warning', 'Do you want to continue saving this team?', [
        {text: 'NO', style: 'cancel'},
        {
          text: 'YES',
          onPress: () =>
            newReference
              .push({...payload, createdAt: new Date().toISOString()})
              .then(() => {
                setTeamName('');
                setSelectedValues([]);
              })
              .finally(() =>
                props.navigation.push('Home', {screen: 'TeamsScreen'}),
              ),
        },
      ]);
    }
  };

  return (
    <View style={styles.screen}>
      {loading ? (
        <View style={styles.screen}>
          <ActivityIndicator color={Colors.primary} size="large" />
        </View>
      ) : (
        <View style={styles.mainContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Enter team name:</Text>
            <TextInput
              mode="outlined"
              placeholder="E.g: 'OP Team'"
              style={styles.textInput}
              value={teamName}
              onChangeText={(text) => setTeamName(text)}
              autoCapitalize="words"
            />
          </View>
          <View style={styles.listContainer}>
            <FlatList
              numColumns={2}
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
          <View style={styles.buttonContainer}>
            <Button
              onPress={handleSubmit}
              mode="contained"
              contentStyle={{width: '100%', height: '100%', borderRadius: 0}}
              style={{borderRadius: 0}}
              color={Colors.accent}
              labelStyle={{color: '#fff'}}
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
  mainContainer: {width: '100%', height: '100%', alignItems: 'center'},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: '100%',
    height: '10%',
  },
  label: {fontFamily: 'OpenSans-Regular', fontSize: 16, fontWeight: 'bold'},
  textInput: {
    width: '50%',
    marginLeft: 15,
    height: 40,
    backgroundColor: '#fff',
  },
  listContainer: {
    width: '90%',
    height: '75%',
    marginVertical: 10,
  },
  buttonContainer: {height: '10%', width: '100%'},
});
export default TeamsManagement;
