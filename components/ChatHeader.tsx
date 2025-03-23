import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';

type ChatHeaderProps = {
    searchText: string;
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
};

export default function ChatHeader({searchText, setSearchText} : ChatHeaderProps) {
    const [isSearching, setIsSearching] = useState(false); // states between if search or not

    return (
        <View style = {{ // background
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#000',
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderTopWidth: 0,
            height: 63,
            width: '100%',
            justifyContent: 'space-between',
        }}>
            {isSearching ? ( // if currently searching, display these
                <TextInput
                    autoFocus
                    placeholder='Search...'
                    placeholderTextColor='#ccc'
                    value = {searchText}
                    onChangeText={setSearchText}
                    style = {{
                        flex: 1,
                        color: '#fff',
                        fontSize: 20,
                        borderBottomWidth: 1,
                        borderBottomColor: '#fff',
                        paddingVertical: 5,
                        marginRight: 10,
                    }}
                />
            ) : (
                <Text style = {{ color: '#fff', fontSize: 30, fontWeight: 'bold', flex: 1}}>Chat</Text> // chat header
            )}

            <TouchableOpacity 
                onPress={() => {
                    if (isSearching) setSearchText('');
                    setIsSearching(!isSearching);
                }}
                style = {{ paddingHorizontal: 10}}
            >
                <FontAwesome name={isSearching ? 'times' : 'search'} size={28} color='white' />  {/* display search icon, when search, display x  */}
            </TouchableOpacity>
        </View>
    );
}
