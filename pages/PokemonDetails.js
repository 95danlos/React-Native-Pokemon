import React from 'react';
import { ScrollView, ImageBackground, StyleSheet, Text, View, Image, Dimensions  } from 'react-native';
import Constants from 'expo-constants';
import { useFonts } from '@use-expo/font';


export default function PokemonDetails({ route }) {

  const { pokemon } = route.params;

  let [fontsLoaded] = useFonts({
    'GloriaHallelujah': require('../assets/fonts/GloriaHallelujah-Regular.ttf')
  })

  
  if(fontsLoaded) {
	  return (
        <ScrollView style={styles.container}>
            <ImageBackground style={styles.backgroundContainer} imageStyle={styles.backgroundImage} source={{uri: "https://image.freepik.com/free-vector/beautiful-blurred-abstract-background_52487-15.jpg"}} >
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{uri: pokemon.sprites.front_default}}
                />
            </View>
            </ImageBackground>
            <View style={styles.infoContainerWrapper}>
              <View style={styles.infoContainer}>
                  <Text style={styles.name}>
                    {pokemon.name}
                  </Text>
                  <View style={styles.line}/>

                  <View style={styles.textContainer}>
                    <Text style={styles.text}>
                      Height: {pokemon.height / 10} m
                      {"\n"}
                      Weight: {pokemon.weight / 10} kg
                    </Text>
                  </View>
                  <View style={styles.line}/>

                  <Text style={styles.header}>
                    Abilities
                  </Text>
                  <View style={styles.textContainer}>
                    {pokemon.abilities.map((item, index) => {
                      return (
                        <Text style={styles.text} key={index}>{item.ability.name}</Text>
                      )
                    })}
                  </View>
                  <View style={styles.line}/>

                  <View style={styles.textContainer}>
                    <Text style={styles.text}>
                      Base Experience: {pokemon.base_experience}
                    </Text>
                  </View>
                  <View style={styles.line}/>
                  
                  <Text style={styles.header}>
                    Sprites
                  </Text>
                  <View style={{flexDirection:'row', flexWrap:"wrap"}}>  
                    <Image source={{uri: pokemon.sprites.front_default}} style={styles.sprites} />
                    <Image source={{uri: pokemon.sprites.front_shiny}} style={styles.sprites} />
                    <Image source={{uri: pokemon.sprites.back_default}} style={styles.sprites} />
                    <Image source={{uri: pokemon.sprites.back_shiny}} style={styles.sprites} />
                  </View>
                  <View style={styles.line}/>

                  <Text style={styles.header}>
                    Type
                  </Text>
                  <View style={styles.textContainer}>
                    {pokemon.types.map((item, index) => {
                      return (
                        <Text style={styles.text} key={index}>{item.type.name}</Text>
                      )
                    })}
                  </View>
                  <View style={styles.line}/>

                  <Text style={styles.header}>
                    Base Stats
                  </Text>
                  <View style={styles.textContainer}>
                    {pokemon.stats.map((item, index) => {
                      return (
                        <Text style={styles.text} key={index}>{item.stat.name}: {item.base_stat}</Text>
                      )
                    })}
                  </View>
                  <View style={styles.line}/>

                  <Text style={styles.header}>
                    Moves
                  </Text>
                  <View style={styles.textContainer}>
                    {pokemon.moves.map((item, index) => {
                      return (
                        <Text style={styles.text} key={index}>{item.move.name}</Text>
                      )
                    })}
                  </View>
              </View>
            </View>
        </ScrollView>
    );
  }
  else {
    return (<View></View>)
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
  },
  imageContainer: {
    backgroundColor: "white",
    borderRadius: 100,
    shadowColor: "grey",
    shadowRadius: 8,
    position: "absolute",
    top: 20,
    left: "50%",
    width: 160,
    height: 160,
    marginLeft: - 80,
  },
  image: {
	  position: "absolute",
    top: 10,
    left: 10,
    width: 140,
    height: 140,
  },
  infoContainer: {
    backgroundColor: "white",
    padding: 20,
  },
  infoContainerWrapper: {
    overflow: "hidden",
    elevation: 16,
    borderRadius: 16,
	  shadowColor: "grey",
    shadowRadius: 16,
	  position: "relative",
    top: 200,
    left: "10%",
    width: "80%",
    marginBottom: 220,
  },
  name: {
    textAlign: "center",
    marginTop: -10,
    marginBottom: 10,
    fontSize: 24,
    textTransform: "capitalize",
    fontFamily: 'GloriaHallelujah',
  },
  text: {
    fontSize: 16,
    textTransform: "capitalize",
    fontFamily: 'GloriaHallelujah',
  },
  textContainer: {
    marginTop: 15,
    marginBottom: 15,
  },
  header: {
    marginTop: 10,
    fontSize: 24,
    textTransform: "capitalize",
    fontFamily: 'GloriaHallelujah',
  },
  sprites: {
    width: 100,
    height: 100,
  },


  
  backgroundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    width: Dimensions.get('window').width,
    height: 250,
  },
  line: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 0.5,
  }
});
