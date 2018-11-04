import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements';
import { createMaterialTopTabNavigator } from 'react-navigation';
import Home from './Home';
import Profile from './Profile';
import Search from './Search';
import Plan from './Plan';
import Recipe from './Recipe';
import Consumer, { Provider } from './Context';

export default createMaterialTopTabNavigator({
  'Home': {
    screen: Home,
    navigationOptions: {
      tabBarIcon: <Icon name="home" type="entypo" size={30} color="#000" containerStyle={{margin: -100}} />
    }
  },
  'Plan': {
    screen: Plan,
    navigationOptions: {
      tabBarIcon: <Icon name="calendar" type="entypo" size={30} color="#000" containerStyle={{margin: -100}} />
    }
  },
  'Search': {
    screen: Search,
    navigationOptions: {
      tabBarIcon: <Icon name="magnifying-glass" type="entypo" size={30} color="#000" containerStyle={{margin: -100}} />
    }
  },
  'Recipe': {
    screen: Recipe,
    navigationOptions: {
      tabBarIcon: <Icon name="open-book" type="entypo" size={30} color="#000" containerStyle={{margin: -100}} />
    }
  },
  'Profile': {
    screen: Profile,
    navigationOptions: {
      tabBarIcon: <Icon name="user" type="font-awesome" size={30} color="#000" containerStyle={{margin: -100}} />
    }
  },
}, {
  initialRouteName: 'Search',
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showLabel: false,
    showIcon: true,
    style: {
      backgroundColor: '#fff',
      paddingVertical: 4,
    },
    indicatorStyle: {
      height: 2,
      backgroundColor: '#000',
      alignSelf: 'flex-end',
    },
  },
  style: {
    backgroundColor: '#fff'
  },
  swipeEnabled: false
});