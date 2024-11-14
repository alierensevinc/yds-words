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
            {data.dictionary.slice(index, index + 3).map((item, i) => (
                <View key={i} style={[styles.cardWrapper, { transform: [{ translateY: i * 15 },] }]}>
                    <Card data={item} onDismiss={handleDismiss}/>
                </View>
            ))}
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
    cardWrapper: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
});