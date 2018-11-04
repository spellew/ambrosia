import React, { Component } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';

export default class Loading extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Animatable.View style={{ position: 'absolute' }} animation="rotate" iterationCount="infinite" /*iterationDelay={125}*/ useNativeDriver>
          <Icon name="loading2" size={252} color="#fff" />
        </Animatable.View>
        <Avatar overlayContainerStyle={{ backgroundColor: 'transparent', position: 'absolute' }} width={window.width * 0.45} height={undefined} source={require('./assets/logo.png')} />
      </View>
    )
  }
}

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    backgroundColor: '#eccb7a',
    justifyContent: 'center',
    alignItems: 'center'
  }
});