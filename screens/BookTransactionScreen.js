import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned: false,


      buttonState: 'normal'
    }
  }

  getCameraPermissions = async (id) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      /*status === "granted" is true when user has granted permission
        status === "granted" is false when user has not granted the permission
      */
      hasCameraPermissions: status === "granted",
      buttonState: id,
      scanned: false
    });
  }

  handleBarCodeScanned = async ({ type, data }) => {
    const { buttonState } = this.state

    if (buttonState === "BookId") {
      this.setState({
        scanned: true,
        scannedBookId: data,
        buttonState: 'normal'
      });
    }
    else if (buttonState === "StudentId") {
      this.setState({
        scanned: true,
        scannedStudentId: data,
        buttonState: 'normal'
      });
    }

  }

  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if (buttonState !== "normal" && hasCameraPermissions) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }

    else if (buttonState === "normal") {
      return (
        <View style={styles.container}>
         // create all the input boxes and buttons here




        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  displayText: {
    fontSize: 15,
    textDecorationLine: 'underline'
  },
  scanButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    margin: 10
  }



});