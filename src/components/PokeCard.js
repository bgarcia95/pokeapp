import React, {useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

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
      style={[
        styles.cardItem,
        {
          backgroundColor: !selectedPokemon ? '#fff' : 'rgba(0,0,0,0.2)',
          elevation: !selectedPokemon ? 5 : 0,
        },
      ]}>
      {!isViewing ? (
        <TouchableOpacity onPress={onPressedCard} activeOpacity={0.6}>
          <View>
            <View style={styles.cardContainer}>
              <View style={styles.cardContent}>
                <View style={styles.imageContainer}>
                  {!pokemon.image && pokemon.image !== null ? (
                    <ActivityIndicator color="red" size="small" />
                  ) : (
                    <Image
                      style={styles.image}
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
                <Text style={styles.pokemonId}># {pokemon.id}</Text>
                <Text style={styles.pokemonName}>{pokemon.name}</Text>
                <Text>{pokemon.description}</Text>
                {pokemon.types && (
                  <View style={styles.row}>
                    <Text style={styles.type}>Type:</Text>
                    {pokemon.types?.map((type, index) => (
                      <Text key={index} style={styles.typeName}>
                        {type.type.name}
                        {pokemon.types?.length > 1 && index === 0 && (
                          <Text> / </Text>
                        )}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.cardContainer}>
          <View style={styles.cardContent}>
            <View style={styles.imageContainer}>
              {!pokemon.image ? (
                <Image
                  style={styles.image}
                  source={require('../../assets/img/notavailable.png')}
                />
              ) : !pokemon.image && pokemon.image !== null ? (
                <ActivityIndicator color="red" size="small" />
              ) : (
                <Image
                  style={styles.image}
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
            <Text style={styles.pokemonId}># {pokemon.id}</Text>
            <Text style={styles.pokemonName}>{pokemon.name}</Text>
            <Text style={styles.pokemonDescription}>{pokemon.description}</Text>
            {pokemon.types && (
              <View style={styles.row}>
                <Text style={styles.type}>Type:</Text>
                {pokemon.types?.map((type, index) => (
                  <Text key={index} style={styles.typeName}>
                    {type.type.name}
                    {pokemon.types?.length > 1 && index === 0 && (
                      <Text> / </Text>
                    )}
                  </Text>
                ))}
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardItem: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
  },
  cardContainer: {
    flex: 1,
    borderRadius: 10,
    padding: 15,
  },
  cardContent: {
    flex: 1,
    elevation: 5,
  },
  imageContainer: {
    height: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {height: '100%', width: 100, alignSelf: 'center'},
  pokemonId: {
    fontFamily: 'OpenSans-Regular',
    color: 'gray',
    fontSize: 16,
  },
  pokemonName: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontFamily: 'OpenSans-Regular',
    fontSize: 24,
  },
  pokemonDescription: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    marginVertical: 5,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginVertical: 5,
  },
  type: {
    fontFamily: 'OpenSans-Regular',
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 5,
  },
  typeName: {
    fontFamily: 'OpenSans-Regular',
    textTransform: 'capitalize',
    fontSize: 14,
    color: '#353535',
  },
});

export default PokeCard;
