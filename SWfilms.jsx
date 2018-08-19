import React from 'react';
import { FlatList, ActivityIndicator, Text, StyleSheet, View  } from 'react-native';

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state = { 
      isLoading: true,
      dataSource: null,
    }
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

  render(){
    if(this.state.isLoading){
      return(
        <View style= {styles.container} >
          <ActivityIndicator/>
        </View>
      )
    } else {
      let films = this.state.dataSource.map((val,key) => {
        return <View key = {key} style={styles.item}>
        <Text>{val.title}</Text>
        </View>
    });
      
    return (
      <View style= {styles.container}>
      
      {films}
      
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
     flex: 1,
        alignSelf: 'stretch',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
   }
});
