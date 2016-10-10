import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  AsyncStorage,
  ScrollView
} from 'react-native';

// App components
import MenuButton from '../nav/MenuButton';
import MyAdventures from '../MyAdventures/myAdventuresContainer';
import MapScreen from './MapScreen';
import UserButton from '../nav/UserButton';

var AllAdventureDetail = function (props) {

  var advenAccept = function(){
    AsyncStorage.getItem('id_token')
      .then(token => {
        fetch("https://treasure-trek.herokuapp.com/api/pickAd", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "x-access-token": token
          },
          body: JSON.stringify({
            adventureid: props.adven._id
          })
        })
        .then(res => {
          return res.json()
        })
        .then(json => {
          props.resetToRoute({
            name: "My Adventures",
            component: MyAdventures,
            leftCorner: MenuButton,
            rightCorner: UserButton
          })
        })
        .catch(err => {
          console.error("failed to send adventure accept: ", err)
        })
      })
  }

  var showList = function() {
    return props.adven.adventure.map((riddle, index) => {
      var riddleNum = index+1
      return (
        <View key={riddleNum} style={style.listStyle}>
          <Text style={{ fontSize: 14 }}>{riddleNum} : {riddle.riddle}</Text>
        </View>
      );
    })
  }

  return (
    <View style={{flex: 1, marginTop:5, flexDirection: 'column', justifyContent: 'space-between'}}>

      <View style={style.map}>
        <MapScreen riddles={props.adven.adventure}/>
      </View>

      <View style={{flex: 2}}>
        <ScrollView>
          {showList()}
        </ScrollView>
        <View>
          <TouchableHighlight style={style.button} onPress={advenAccept}>
            <Text style={style.buttonText}>Accept</Text>
          </TouchableHighlight>
        </View>
      </View>

    </View>
  );

};

var style = {
  map: {
    margin: 5, // changed from 10
    position: 'relative',
    flex: 3
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20,
    marginBottom: 15,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  listStyle : {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    padding: 5,
  },
  loc : {
    fontSize: 10,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: 'gray'
  },
  title: {
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    fontWeight: 'bold',
    elevation: 1,
    flexDirection: 'column'
  }
}

export default AllAdventureDetail
