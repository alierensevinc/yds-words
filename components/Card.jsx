import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';

const Card = ({ data }) => {
    const rotateY = useSharedValue(0);

    const frontAnimatedStyle = useAnimatedStyle(() => {
        const rotate = `${rotateY.value}deg`;
        return {
            transform: [{ rotateY: rotate }],
            backfaceVisibility: 'hidden',
        };
    });

    const backAnimatedStyle = useAnimatedStyle(() => {
        const rotate = `${rotateY.value + 180}deg`;
        return {
            transform: [{ rotateY: rotate }],
            backfaceVisibility: 'hidden',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        };
    });

    const handlePress = () => {
        rotateY.value = withSpring(rotateY.value + 180, { damping: 20, stiffness: 75 });
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.cardContainer}>
                <Animated.View style={[styles.card, frontAnimatedStyle]}>
                    <Text style={styles.text}>{data.english}</Text>
                </Animated.View>
                <Animated.View style={[styles.card, backAnimatedStyle]}>
                    <Text style={styles.text}>{data.turkish}</Text>
                </Animated.View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: 300,
        height: 200,
        margin: 20,
    },
    card: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f8f9fa',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    text: {
        fontSize: 18,
        color: '#333',
    },
});

export default Card;