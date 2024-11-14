import {StyleSheet, Text, View} from 'react-native';
import {useState, useEffect} from "react";
import data from '@/assets/all.json';
import Card from "@/components/Card";

export default function HomeScreen() {
    const [randomizedData, setRandomizedData] = useState([]);

    useEffect(() => {
        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };

        setRandomizedData(shuffleArray([...data.dictionary]));
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>YDS Kelimeler</Text>
            <View style={[styles.cardWrapper, {transform: [{translateY: 1 * 15},]}]}>
                {randomizedData.length > 0 && <Card data={randomizedData[0]}/>}
            </View>
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