import React, { useLayoutEffect } from 'react'
import { useState } from 'react'
import { StatusBar } from 'react-native'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { Input, Text, Button } from 'react-native-elements'
import { auth } from '../firebase'

const Register = ({ navigation }) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    // similar to use effect of react native
    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: 'Back to Login'
        })
    }, [navigation])

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then(authUser => {
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL: imageUrl || 'https://p.kindpng.com/picc/s/78-785904_block-chamber-of-commerce-avatar-white-avatar-icon.png'
                })
            })
            .catch(error => alert(error.message))
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />

            <Text h3 style={{ marginBottom: 50 }}>
                Create a Signal Account
            </Text>

            <View style={styles.inputContainer}>
                <Input
                    placeholder="Full Name"
                    autofocus
                    type="text"
                    value={fullName}
                    style={{ outline: "none" }}
                    onChangeText={text => setFullName(text)}
                />
                <Input
                    placeholder="Email"
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
                <Input
                    placeholder="Profile Picture"
                    autofocus
                    type="text"
                    value={imageUrl}
                    style={{ outline: "none" }}
                    onChangeText={text => setImageUrl(text)}
                    // on pressing enter on final field
                    onSubmitEditing={register}
                />
            </View>

            <Button style={styles.button} onPress={register} title="Register" raised />
        </KeyboardAvoidingView>
    )
}

export default Register

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
