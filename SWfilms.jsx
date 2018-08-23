import React, { Component } from 'react';

import { FlatList, ActivityIndicator, Text, StyleSheet, View, Picker, TouchableOpacity, Image } from 'react-native';

export default class FetchExample extends React.Component {

  constructor(props){

    super(props);

    this.state = { 
      isLoading: true,
      dataSource: null,
      user: '',
    };
    
  }

updateUser = (user) => {
    this.setState({user: user})
  }

openPopup() {
    console.log("function called");
 }

componentDidMount() {

    return fetch('https://swapi.co/api/films/?format=json')

      .then((response) => response.json())

      .then((responseJson) => {

        this.setState({

          isLoading: false,

          dataSource: responseJson.results,

        })

      })

      .catch((error) => {

        console.error(error);

      });

  }
  
filmCrawl() {
  console.log("filmCrawl");
  }

render(){

    let pic = {
      uri: 'https://wallpapercave.com/wp/mSjF3lW.png'
    };

    if(this.state.isLoading){

      return(

        <View style= {styles.container} >

          <ActivityIndicator/>

        </View>

      )

    } else {
      
        return (
          
        <View style={styles.item}>
        <Image source={pic} style={{width: 193, height: 110}}/>        
        
        <TouchableOpacity style={styles.button} onPress={this.filmCrawl}>
        <Text>Episode I</Text></TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={this.openPopup}>
        <Text>Episode II</Text></TouchableOpacity>
        
        <Text> {this.props.crawl} </Text>
        
        <FlatList
          data={this.state.dataSource}
          
          renderItem={({item}) => <Text>Film: {item.title}, {item.opening_crawl}</Text>}
          keyExtractor={(item, index) => index}/>

        </View>
        
        );

    }

  }

}

const styles = StyleSheet.create({

  container: {

     flex: 1,

     justifyContent: 'center',

     margin: 20,

   },

   item: {
      fontSize: 200,
      alignSelf: 'center',
      color: 'red',
      margin: 3,
  
   }

});
