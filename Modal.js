import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Header, Text, Icon } from 'react-native-elements';
import NativeModal from 'react-native-modal';

export default class Modal extends Component {
  render() {
    const { title, icon } = this.props.header;
    return (
      <NativeModal isVisible={this.props.isModalVisible} onBackButtonPress={this.props.hideModal} onBackdropPress={this.props.hideModal} >
        <View style={{ paddingBottom: 50, paddingHorizontal: 50, backgroundColor: '#fff' }}>
          <Header outerContainerStyles={{ backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}
            centerComponent={<Text style={{ flex: 1, fontWeight: 'bold', fontSize: 32, color: '#000', marginHorizontal: 35 }}>{title}</Text>}
            rightComponent={<TouchableOpacity onPress={icon.onPress}>
              <Icon name={icon.name} type={icon.type} size={icon.size} color={icon.color} />
            </TouchableOpacity>}
          />
          <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }} style={{ paddingTop: 35 }}>
            {this.props.children}
          </ScrollView>
        </View>
      </NativeModal>
    );
  }
}