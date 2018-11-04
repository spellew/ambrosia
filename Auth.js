import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, ScrollView } from 'react-native';
import { Avatar, Button, Text, FormInput } from 'react-native-elements';

export default class Auth extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.inner} contentContainerStyle={styles.innerContainer} >
          <View style={{ flex: 6, justifyContent: 'center', alignItems: 'center' }}>
            <Avatar overlayContainerStyle={{ backgroundColor: 'transparent' }} width={window.width * 0.45} height={undefined} source={require('./assets/logo.png')} />
            <Text style={{ fontSize: 44, fontWeight: 'bold', marginVertical: 10 }}>Ambrosia</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <FormInput containerStyle={{ backgroundColor: '#fff' }} />
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <FormInput containerStyle={{ backgroundColor: '#fff' }} />
          </View>
          <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
            <Button title="Log In" icon={{ name: 'login', type: 'material-community', size: 32 }} textStyle={{ width: '50%', textAlign: 'center', fontSize: 18 }} />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eccb7a',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'purple'
  }
});