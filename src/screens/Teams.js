import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRegions} from '../redux/actions/regions';
import {fetchPokemonsSuccess} from '../redux/actions/pokemons';

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
  const dispatch = useDispatch();

  const [region, setRegion] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);

  const regions = useSelector((state) => state.regions.regions);
  const pokemons = useSelector((state) => state.pokemons.pokemons);
  const loading = useSelector((state) => state.pokemons.isLoading);

  useEffect(() => {
    const getRegions = () => dispatch(fetchRegions());
    getRegions();
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

  useEffect(() => {
    if (region !== null) {
      const getPokemons = () => dispatch(fetchPokemonsSuccess(region));
      getPokemons();
    }
  }, [region, dispatch]);

  const regionsDDData = regions?.map((region) => ({
    label: region.name.toUpperCase(),
    value: region.name,
    icon: () => <Icon name="map" size={18} color="#900" />,
  }));

  return (
    <View style={styles.screen}>
      <Text>Home Screen!</Text>

      <DropDownPicker
        items={regionsDDData}
        defaultValue={selectedRegion}
        placeholder="Select a region"
        containerStyle={{
          height: 40,
          width: 150,
          marginVertical: 20,
        }}
        style={{backgroundColor: '#fafafa', zIndex: 5}}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        dropDownStyle={{
          backgroundColor: '#fafafa',
          zIndex: 5,
        }}
        onChangeItem={(item) => setSelectedRegion(item.value)}
        disabled={loading}
      />

      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator color="blue" size="large" />
        </View>
      ) : pokemons?.length === 0 ? (
        <View style={styles.screen}>
          <Text>Start your journey!</Text>
        </View>
      ) : (
        <FlatList
          style={{
            width: '90%',
            height: 250,
            marginTop: 200,
          }}
          numColumns={2}
          contentContainerStyle={{paddingVertical: 10}}
          data={pokemons}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <PokeCard pokemon={item} />}
        />
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

export default Home;
