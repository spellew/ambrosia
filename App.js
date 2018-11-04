import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements';
import { createSwitchNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import Loading from './Loading';
import Search from './Search';
import Plan from './Plan';
import Recipe from './Recipe';
import { Provider } from './Context';

const Navigator = createMaterialTopTabNavigator({
  'Plan': {
    screen: Plan,
    navigationOptions: {
      tabBarIcon: <Icon name="calendar" type="entypo" size={30} color="#fff" containerStyle={{margin: -100}} />
    }
  },
  'Search': {
    screen: Search,
    navigationOptions: {
      tabBarIcon: <Icon name="magnifying-glass" type="entypo" size={30} color="#fff" containerStyle={{margin: -100}} />
    }
  },
  'Recipe': {
    screen: Recipe,
    navigationOptions: {
      tabBarIcon: <Icon name="open-book" type="entypo" size={30} color="#fff" containerStyle={{margin: -100}} />
    }
  },
}, {
  initialRouteName: 'Search',
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showLabel: false,
    showIcon: true,
    style: {
      backgroundColor: '#eccb7a',
      paddingVertical: 4,
    },
    indicatorStyle: {
      height: 2,
      backgroundColor: '#fff',
      alignSelf: 'flex-end',
    },
  },
  style: {
    backgroundColor: '#fff'
  },
  swipeEnabled: false
});

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loading: true
    };
  }
  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1500);
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
         {/* {this.state.loading ? <Loading /> : null}
         {this.state.loading ? null : <Provider>
          <Navigator />
        </Provider>} */}
        <Provider>
          <Navigator />
        </Provider>
      </View>
    );
  }
}