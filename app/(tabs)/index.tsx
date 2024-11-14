import {StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from "react";
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

    const handleSwipe = () => {
        setRandomizedData((prevData) => {
            const newData = [...prevData];
            newData.shift();
            newData.push(data.dictionary[Math.floor(Math.random() * data.dictionary.length)]);
            return newData;
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>YDS Kelimeler</Text>
            <View style={styles.stackContainer}>
                {randomizedData.length > 0 && (
                    <>
                        <View style={[styles.cardWrapper, styles.cardPosition1]}>
                            <Card data={randomizedData[0]} onSwipe={handleSwipe}/>
                        </View>
                        <View style={[styles.cardWrapper, styles.cardPosition2]}>
                            <Card data={randomizedData[1]}/>
                        </View>
                        <View style={[styles.cardWrapper, styles.cardPosition3]}>
                            <Card data={randomizedData[2]}/>
                        </View>
                    </>
                )}
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
    stackContainer: {
        width: 300,
        height: 300,
    },
    cardWrapper: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    cardPosition1: {
        zIndex: 3,
        transform: [{translateY: 0}],
    },
    cardPosition2: {
        zIndex: 2,
        transform: [{translateY: -15}],
    },
    cardPosition3: {
        zIndex: 1,
        transform: [{translateY: -30}],
    },
});