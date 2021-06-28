import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { Button, Input, Image } from 'react-native-elements';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = () => {

    }

    const register = () => {
        navigation.navigate("Register")
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Image
                source={{
                    uri: 'https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png'
                }}
                style={{ width: 200, height: 200 }}
            />

            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Email" 
                    autofocus 
                    type="email"
                    value={email}
                    style={{ outline: "none" }}
                    onChangeText={text => setEmail(text)}
                />
                <Input 
                    placeholder="Password" 
                    autofocus 
                    type="password" 
                    secureTextEntry 
                    value={password}
                    style={{ outline: "none" }}
                    onChangeText={text => setPassword(text)}
                />
            </View>

            {/* container style for react native elements */}
            <Button onPress={signIn} containerStyle={styles.button} title="Login" />
            <Button onPress={register} containerStyle={styles.button} type="outline" title="Register" />

            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white'
    },

    inputContainer: {
        width: 300,
    },

    button: {
        width: 200,
        marginTop: 10
    }
})
