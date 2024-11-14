import {StyleSheet, Text, View} from 'react-native';
import {useState} from "react";
import data from '@/assets/all.json';
import Card from "@/components/Card";

export default function HomeScreen() {
    const [index, setIndex] = useState(0);

    const handleDismiss = () => {
        setIndex((prevIndex) => (prevIndex + 1) % data.dictionary.length);
    };

    const randomizedData = [...data.dictionary].sort(() => Math.random() - 0.5);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>YDS Kelimeler</Text>
            {randomizedData.slice(index, index + 3).map((item, i) => (
                <View key={i} style={[styles.cardWrapper, {transform: [{translateY: i * 15},]}]}>
                    <Card data={item} onDismiss={handleDismiss}/>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 36,
        color: '#D4AC0D',
        fontWeight: "bold",
        position: 'absolute',
        top: 140,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2980B9',
    },
    cardWrapper: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
});