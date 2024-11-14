import {StyleSheet, View} from 'react-native';
import {useState} from "react";
import data from '@/assets/all.json';
import Card from "@/components/Card";

export default function HomeScreen() {
    const [index, setIndex] = useState(0);

    const handleDismiss = () => {
        setIndex((prevIndex) => (prevIndex + 1) % data.dictionary.length);
    };

    return (
        <View style={styles.container}>
            <Card data={data.dictionary[index]} onDismiss={handleDismiss}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
});
