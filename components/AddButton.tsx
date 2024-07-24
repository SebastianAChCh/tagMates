import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const AddButton = () => {
    return (
        <TouchableOpacity style={{ backgroundColor: "#00ABA1", borderRadius: 100, width: "10%", height: "100%" }}>
            <Text style={{ fontSize: 25, color: 'white', left: '25%', bottom: '20%' }}>+</Text>
        </TouchableOpacity>
    )
}

export default AddButton;