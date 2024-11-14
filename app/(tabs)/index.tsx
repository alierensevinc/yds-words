import {StyleSheet, Text, View} from 'react-native';
import {useState} from "react";
import data from '@/assets/all.json';
import Card from "@/components/Card";

export default function HomeScreen() {
    const [index, setIndex] = useState(0);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>YDS Kelimeler</Text>
            <View style={[styles.cardWrapper, {transform: [{translateY: 1 * 15},]}]}>
                <Card data={data.dictionary[0]}/>
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