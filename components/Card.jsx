import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Animated, {runOnJS, useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';

const Card = ({data}) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const rotateY = useSharedValue(0);

    const frontAnimatedStyle = useAnimatedStyle(() => {
        const rotate = `${rotateY.value}deg`;
        return {
            transform: [{rotateY: rotate}],
            backfaceVisibility: 'hidden',
        };
    });

    const backAnimatedStyle = useAnimatedStyle(() => {
        const rotate = `${rotateY.value + 180}deg`;
        return {
            transform: [{rotateY: rotate}],
            backfaceVisibility: 'hidden',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        };
    });

    const handlePress = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            rotateY.value = withSpring(rotateY.value + 180, {damping: 20, stiffness: 75}, () => {
                runOnJS(setIsAnimating)(false);
            });
        }
    };

    return (
        <Pressable onPress={handlePress} disabled={isAnimating}>
            <View style={styles.cardContainer}>
                <Animated.View style={[styles.card, frontAnimatedStyle]}>
                    <Text style={styles.textEnglish}>{data.english}</Text>
                </Animated.View>
                <Animated.View style={[styles.card, backAnimatedStyle]}>
                    <Text style={styles.textTurkish}>{data.turkish}</Text>
                </Animated.View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: 300,
        height: 300,
        margin: 20,
    },
    card: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F7DC6F',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 10,
        padding: 36
    },
    textEnglish: {
        fontSize: 36,
        color: '#1A5276',
        fontWeight: "500"
    },
    textTurkish: {
        fontSize: 24,
        color: '#1A5276',
        fontWeight: "300"
    }

});

export default Card;