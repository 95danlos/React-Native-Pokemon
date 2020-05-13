import React, { useEffect, useState } from 'react';
import { ActivityIndicator, TouchableWithoutFeedback, ImageBackground, StyleSheet, Text, View, FlatList, Image, TextInput, Dimensions, ScrollView  } from 'react-native';
import Constants from 'expo-constants';
import { useFonts } from '@use-expo/font';
import { EvilIcons } from '@expo/vector-icons';


export default function PokemonList({ navigation }) {

  const [pokemons, setPokemons] = useState();
  const [searchkey, setSearchkey] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState();
  const [loadMoreUrl, setLoadMoreUrl] = useState();

  let [fontsLoaded] = useFonts({
    'GloriaHallelujah': require('../assets/fonts/GloriaHallelujah-Regular.ttf')
  })

  useEffect(() => {
	  if(!pokemons) {
		fetchPokemons()
	  }
	  else {
		filterPokemonsBySearchKey(searchkey)
	  }
  }, [pokemons, searchkey]);


  if(fontsLoaded) {
	return (
		<ImageBackground style={styles.backgroundContainer} imageStyle={styles.backgroundImage} source={{uri: "https://image.freepik.com/free-vector/beautiful-blurred-abstract-background_52487-15.jpg"}} >
			<View style={styles.container}>
				<FlatList
					data={filteredPokemons}
					renderItem={({ item }) => <PokemonCard pokemon={item} />}
					keyExtractor={(item, index) => index.toString()}
					onEndReached={fetchPokemons}
					ListHeaderComponent={
						<View style={styles.inputFieldContainer}>
							<EvilIcons name="search" size={30} color="black" style={styles.searchIcon}/>
							<TextInput
								placeholder="Search.." 
								style={styles.inputField}
								onChangeText={input => setSearchkey(input)}
							/>
						</View>}
					
					ListFooterComponent={
						<ActivityIndicator size="large" color="#0000ff" style={styles.spinner} />
					}
				/>
			</View>
		</ImageBackground>
	);
  }
  else {
    return (<View></View>)
  }


	function PokemonCard({ pokemon }) {
		return (
			<TouchableWithoutFeedback
				onPress={() => navigation.navigate('PokemonDetails', {pokemon: pokemon,})}>

				<View style={styles.pokemonCard}>
					<Image
						style={styles.image}
						source={{uri: pokemon.sprites.front_default}}
					/>
					<Text style={styles.name}>{pokemon.name}</Text>
				</View>
			</TouchableWithoutFeedback>
		);
	}



	
	
	function fetchPokemons() {
		fetch(loadMoreUrl || "https://pokeapi.co/api/v2/pokemon")
		.then(response => response.json())
		.then(async data => {
			setLoadMoreUrl(data.next)
			
			let fetches = [];
			let pokemons_ = []
			if(pokemons) {
				pokemons_ = JSON.parse(JSON.stringify(pokemons))
			}

			for (let i = 0; i < data.results.length; i++) {
				fetches.push(await fetch(data.results[i].url)
				.then(response_2 => response_2.json())
				.then(pokemon => {
					pokemons_.push(pokemon)
				}))
			}
			
			Promise.all(fetches).then(function() {
				setPokemons(pokemons_)
			});
		})
	}


	function filterPokemonsBySearchKey(searchkey) {
		setFilteredPokemons(pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchkey.toLowerCase())))
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
  },
  inputFieldContainer: {
	position: "relative",
	width: 300,
	height: 40, 
	left: "50%",
	marginLeft: -150,
	margin: 10,
  },
  inputField: {
	backgroundColor: "white",
	padding: 10,
	borderRadius: 100,
  },
  searchIcon: {
	position: "absolute", 
	left: 255, 
	zIndex: 1, 
	marginTop: 8,
  },
  spinner: {
	margin: 10,  	  
  },
  pokemonCard: {
	backgroundColor: "white",
	borderRadius: 10,
	shadowColor: "grey",
	shadowRadius: 8,
    padding: 20,
    marginVertical: 8,
	marginHorizontal: 16,
	position: "relative",
	width: 200,
	height: 200,
	left: "50%",
	marginLeft: -100,
  },
  name: {
	position: "relative",
	textAlign: "center",
	top: "75%",
	fontSize: 24,
	textTransform: "capitalize",
	fontFamily: "GloriaHallelujah",
	},
  image: {
	position: "absolute",
	left: 40,
	top: 20,
    width: 120,
	height: 120,
  },


  
  backgroundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
