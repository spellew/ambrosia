import React, { Component} from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import Voice from 'react-native-voice';

export default class Assistant extends Component {
  constructor() {
    super();

    Voice.onSpeechStart = this.handleSpeechStart;
    Voice.onSpeechRecognized = this.handleSpeechRecognized;
    Voice.onSpeechEnd = this.handleSpeechEnd;
    Voice.onSpeechError = this.handleSpeechError;
    Voice.onSpeechResults = this.handleSpeechResults;
    // Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    // Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
  }
  startListening = async () => {
    try {
      console.log('isAvailable', await Voice.isAvailable());
      console.log('isRecognizing', await Voice.isRecognizing());
      // if (await Voice.isAvailable() && !(await Voice.isRecognizing())) {
        await Voice.start('en-US');
        console.log('started');
      // }
    } catch (err) {
      console.error("Error: ", err);
    }
  }
  handleSpeechStart = () => {
    console.log('listening');
  }
  handleSpeechEnd = () => {
    console.log('done listening');
  }
  handleSpeechRecognized = () => {
    console.log('recognized');
  }
  handleSpeechResults = (evt) => {
    console.log('value', evt.value);
  }
  handleSpeechError = (err) => {
    console.error("Error: ", err);
  }
  render() {
    return (
      <TouchableOpacity onPress={this.startListening}>
        <View style={{ paddingTop: 7 }}>
          <Icon name="microphone" type="font-awesome" size={24} color="#000" containerStyle={{ height:'100%', alignItems: 'center', justifyContent: 'center' }} />
        </View>
      </TouchableOpacity>
    )
  }
}