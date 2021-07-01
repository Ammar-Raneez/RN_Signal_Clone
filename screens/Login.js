import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { Button, Input, Image } from 'react-native-elements';
import { auth } from '../firebase';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitleStyle: { alignSelf: 'center' },
        })
    }, [])

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(authUser => {
            if (authUser) {
                // we dont put home to stack
                // we then we can navigate back to login thru the top nav bar
                navigation.replace("Home")
            }
        })
        
        return unsubscribe;
    }, [])

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password)
            .then(() => navigation.replace("Home"))
            .catch(error => alert(error.message))
    }

    const register = () => {
        navigation.navigate("Register")
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
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
                    onChangeText={text => setEmail(text)}
                />
                <Input 
                    placeholder="Password" 
                    autofocus 
                    type="password" 
                    secureTextEntry 
                    value={password}
                    onChangeText={text => setPassword(text)}
                    onSubmitEditing={signIn}
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
