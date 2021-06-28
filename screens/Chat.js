import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native';
import { Platform } from 'react-native';
import { TextInput } from 'react-native';

const Chat = ({ navigation, route }) => {
    const [message, setMessage] = useState("");

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
                            uri: 'https://png.pngtree.com/png-clipart/20210523/original/pngtree-girl-with-small-flower-colorful-character-avatar-png-image_6317028.jpg'
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
    }, [navigation])

    const sendMessage = () => {

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <>
                    <ScrollView>

                    </ScrollView>
                    <View style={styles.footer}>
                        <TextInput 
                            value={message}
                            onChangeText={text => setMessage(text)}
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
})
