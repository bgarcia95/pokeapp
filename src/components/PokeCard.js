import React, {useState} from 'react';
import {ActivityIndicator, Image, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {poly} from 'react-native/Libraries/Animated/src/Easing';

const PokeCard = ({pokemon, selectedValues, setSelectedValues, isViewing}) => {
  const foundPokemon = selectedValues?.find((pok) => pok.id === pokemon.id);

  const [selectedPokemon, setSelectedPokemon] = useState(foundPokemon);

  const onPressedCard = () => {
    if (!selectedPokemon) {
      if (selectedValues.length < 6) {
        setSelectedPokemon(pokemon);
        setSelectedValues((prevState) => prevState.concat(pokemon));
      } else {
        return;
      }
    } else {
      setSelectedPokemon(null);
      setSelectedValues((prevState) =>
        prevState.filter((det) => det.id !== pokemon.id),
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        margin: 10,
        borderRadius: 10,
        backgroundColor: !selectedPokemon ? '#fff' : 'rgba(0,0,0,0.2)',
        elevation: !selectedPokemon ? 5 : 0,
      }}>
      {!isViewing ? (
        <TouchableOpacity onPress={onPressedCard} activeOpacity={0.6}>
          <View>
            <View
              style={{
                flex: 1,
                borderRadius: 10,
                padding: 15,
              }}>
              <View
                style={{
                  width: 150,
                  elevation: 5,
                }}>
                <View
                  style={{
                    height: 100,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {!pokemon.image && pokemon.image !== null ? (
                    <ActivityIndicator color="red" size="small" />
                  ) : (
                    <Image
                      style={{height: '100%', width: 100, alignSelf: 'center'}}
                      source={
                        pokemon.image !== null
                          ? {
                              uri: pokemon.image,
                            }
                          : require('../../assets/img/notavailable.png')
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
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <View
          style={{
            flex: 1,
            borderRadius: 10,
            padding: 15,
          }}>
          <View
            style={{
              width: '100%',
              elevation: 5,
            }}>
            <View
              style={{
                height: 100,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {!pokemon.image ? (
                <Image
                  style={{height: 80, width: 80, alignSelf: 'center'}}
                  source={require('../../assets/img/notavailable.png')}
                />
              ) : !pokemon.image && pokemon.image !== null ? (
                <ActivityIndicator color="red" size="small" />
              ) : (
                <Image
                  style={{height: '100%', width: 100, alignSelf: 'center'}}
                  source={
                    pokemon.image !== null
                      ? {
                          uri: pokemon.image,
                        }
                      : require('../../assets/img/notavailable.png')
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
        </View>
      )}
    </View>
  );
};

export default PokeCard;
