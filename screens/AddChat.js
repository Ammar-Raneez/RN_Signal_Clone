import React, { useLayoutEffect, useState } from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { Icon, Input } from 'react-native-elements'
import { db } from '../firebase';

const AddChat = ({ navigation }) => {
    const [chatName, setChatName] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Add A New Chat',
            headerTitleStyle: { marginLeft: -20 },
        })
    }, [navigation])

    const createChat = async () => {
        await db.collection('chats').add({
            chatName
        })
        .then(() => navigation.goBack())
        .catch(error => alert(error))
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder="Enter a chat name"
                value={chatName}
                style={{ outline: 'none' }}
                onChangeText={text => setChatName(text)}
                leftIcon={
                    <Icon name="wechat" type="antdesign" size={24} color="black" />
                }
                onSubmitEditing={createChat}
            />
            <Button onPress={createChat} title="Create New Chat" />
        </View>
    )
}

export default AddChat

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 20,
        height: '100%',
    }
})
