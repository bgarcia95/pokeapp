import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const Home = (props) => {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    const fetchRegions = async () =>
      await fetch('https://pokeapi.co/api/v2/region/')
        .then((res) => res.json())
        .then((resp) => setRegions(resp.results));

    fetchRegions();
  }, []);

  return (
    <View style={styles.screen}>
      <Text>Home Screen!</Text>
      <Button
        onPress={() => props.setShowHome(false)}
        title="Go Back"
        color="purple"
      />
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
