import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { auth } from '../firebase';

const Home = () => {
    console.log(auth.currentUser);
    
    return (
        <View>
            <Text>Home</Text>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})
