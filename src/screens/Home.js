import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

const PokeCard = ({pokemon}) => {
  return (
    <View
      style={{
        flex: 1,
        margin: 10,
      }}>
      <View
        style={{
          height: 100,
          width: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {!pokemon.image && pokemon.image !== null ? (
          <ActivityIndicator color="red" size="small" />
        ) : (
          <Image
            style={{height: '100%', width: '100%'}}
            source={
              pokemon.image !== null
                ? {
                    uri: pokemon.image,
                  }
                : require('../../assets/img/notavailable.jpg')
            }
          />
        )}
      </View>
      <Text># {pokemon.id}</Text>
      <Text style={{fontWeight: 'bold', textTransform: 'capitalize'}}>
        {pokemon.name}
      </Text>
      <Text>{pokemon.description}</Text>
    </View>
  );
};

const Home = (props) => {
  const [regions, setRegions] = useState([]);
  const [region, setRegion] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);

  const [arr, setArr] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRegions = async () =>
      await fetch('https://pokeapi.co/api/v2/region/')
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          console.log('resp', resp);
          setRegions(resp.results);
        });

    fetchRegions();
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

  const tempArr = [];

  useEffect(() => {
    if (region !== null) {
      setArr([]);
      setLoading(true);
      const fetchPokemons = async () =>
        await fetch(`${region['main_generation']?.url}`)
          .then((res) => {
            return res.json();
          })
          .then((resp) => {
            return resp['pokemon_species']?.map((entry, index) => {
              fetch(entry?.url)
                .then((res) => {
                  return res.json();
                })
                .then((resp) => {
                  tempArr.push({
                    description: resp['flavor_text_entries']?.find(
                      (entry) => entry.language.name === 'en',
                    )['flavor_text'],
                    id: resp.id,
                    name: resp.name,
                  });
                  setArr(tempArr.sort((a, b) => (a.id > b.id ? 1 : -1)));
                  return resp;
                })
                .then((resp) => {
                  fetch(`https://pokeapi.co/api/v2/pokemon/${resp.id}/`)
                    .then((response) => response.json())
                    .then((resp) => {
                      setArr((prevState) =>
                        prevState
                          .map((pokemon) =>
                            pokemon.id === resp.id
                              ? {
                                  ...pokemon,
                                  image: resp.sprites['front_default'],
                                  types: resp.types,
                                }
                              : pokemon,
                          )
                          .sort((a, b) => (a.id > b.id ? 1 : -1)),
                      );
                      setLoading(false);
                    });
                });

              return entry;
            });
          });

      fetchPokemons();
    }
  }, [region]);

  const regionsDDData = regions.map((region, index) => ({
    label: region.name.toUpperCase(),
    value: region.name,
    icon: () => <Icon name="map" size={18} color="#900" />,
  }));

  return (
    <View style={styles.screen}>
      <Text>Home Screen!</Text>
      <Button
        onPress={() => props.setShowHome(false)}
        title="Go Back"
        color="purple"
      />

      <DropDownPicker
        items={regionsDDData}
        defaultValue={selectedRegion}
        placeholder="Select a region"
        containerStyle={{height: 40, width: 150, marginVertical: 20}}
        style={{backgroundColor: '#fafafa'}}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        dropDownStyle={{backgroundColor: '#fafafa', zIndex: 10}}
        onChangeItem={(item) => setSelectedRegion(item.value)}
        disabled={loading}
      />

      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator color="blue" size="large" />
        </View>
      ) : (
        <FlatList
          style={{
            width: '90%',
            height: 250,
            marginTop: 200,
            //   backgroundColor: 'red',
          }}
          numColumns={2}
          contentContainerStyle={{paddingVertical: 10}}
          data={arr}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <PokeCard pokemon={item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
