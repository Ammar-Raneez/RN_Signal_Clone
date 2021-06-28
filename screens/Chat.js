import React, { useLayoutEffect, useState } from 'react'
import { Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native';
import { Platform } from 'react-native';
import { TextInput } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { auth, db } from '../firebase'
import firebase from 'firebase/app'

const Chat = ({ navigation, route }) => {
    const [message, setMessage] = useState("");
    const [pastMessages, setPastMessages] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () => (
                <View
                    style={{
                        marginLeft: -20,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Avatar
                        rounded 
                        source={{
                            uri: pastMessages[0]?.data.photoURL || 'https://www.seekpng.com/png/detail/110-1100707_person-avatar-placeholder.png'
                        }}
                    />
                    <Text
                        style={{
                            color: 'black',
                            marginLeft: 10,
                            fontWeight: '700'
                        }}
                    >
                        {route.params.chatName}
                    </Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity
                    style={{ marginLeft: 10 }}
                    onPress={navigation.goBack}
                >
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: 80,
                        marginRight: 20
                    }}
                >
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation, pastMessages])

    useLayoutEffect(() => {
        const unsubscribe = db.collection('chats').doc(route.params.id).collection('messages').orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setPastMessages(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })

        return unsubscribe
    }, [route])

    const sendMessage = () => {
        Keyboard.dismiss();

        db.collection("chats").doc(route.params.id).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })

        setMessage('');
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView contentContainerStyle={{paddingTop: 15 }}>
                            {pastMessages.map(({ id, data }) => (
                                data.email === auth.currentUser.email ? (
                                    <View key={id} style={styles.receiver}>
                                        <Avatar 
                                            rounded 
                                            position="absolute"
                                            bottom={-15} 
                                            right={-5}
                                            containerStyle={{
                                                position: "absolute",
                                                bottom: -15 ,
                                                right: -5
                                            }} 
                                            size={30} 
                                            source={{ 
                                                uri: data.photoURL 
                                            }}
                                        />
                                        <Text style={styles.receiverText}>{data.message}</Text>
                                    </View>
                                ) : (
                                    <View key={id} style={styles.sender}>
                                        <Avatar 
                                            rounded 
                                            position="absolute"
                                            bottom={-15} 
                                            right={-5}
                                            containerStyle={{
                                                position: "absolute",
                                                bottom: -15 ,
                                                right: -5
                                            }} 
                                            size={30} 
                                            source={{ 
                                                uri: data.photoURL 
                                            }}
                                        />
                                        <Text style={styles.senderText}>{data.message}</Text>
                                        <Text style={styles.senderName}>{data.displayName}</Text>
                                    </View>
                                )
                            ))}
                        </ScrollView>
                        <View style={styles.footer}>
                            <TextInput 
                                value={message}
                                onChangeText={text => setMessage(text)}
                                onSubmitEditing={sendMessage}
                                placeholder="Signal Message" 
                                style={{
                                    outline: 'none',
                                    bottom: 0,
                                    height: 40,
                                    flex: 1,
                                    marginRight: 15,
                                    backgroundColor: '#ECECEC',
                                    padding: 10,
                                    color: 'grey',
                                    borderRadius: 30
                                }}
                            />
                            <TouchableOpacity
                                onPress={sendMessage}
                                activeOpacity={0.5}
                            >
                                <Ionicons name="send" size={24} color="#2B6BE6" />
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Chat

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 15
    },

    receiver: {
        padding: 15,
        backgroundColor: '#ECECEC',
        alignSelf: 'flex-end',
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: '80%',
        position: 'relative'
    },

    sender: {
        padding: 15,
        backgroundColor: '#2B68E6',
        alignSelf: 'flex-start',
        borderRadius: 20,
        margin: 15,
        maxWidth: '80%',
        position: 'relative'
    },

    senderText: {
        color: 'white',
        fontWeight: '500',
        marginLeft: 10,
        marginBottom: 15
    },

    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: 'white'
    },

    receiverText: {
        color: 'black',
        fontWeight: '500',
        marginLeft: 10
    }
})
