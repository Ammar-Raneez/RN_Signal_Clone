import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'

const CustomListItem = ({ id, chatName, enterChat }) => {
    return (
        <ListItem key={id} bottomDivider>
            <Avatar
                rounded
                source={{
                    uri: 'https://png.pngtree.com/png-clipart/20210523/original/pngtree-girl-with-small-flower-colorful-character-avatar-png-image_6317028.jpg'
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: 'bold' }}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
                    this is a long text this is a long text this is a long textthis is a long textthis is a long textthis is a long textthis is a long textthis is a long textthis is a long textthis is a long text this is a long text this is a long textthis is a long textthis is a long textthis is a long textthis is a long text
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
