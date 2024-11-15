import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Animated, {
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

const Card = ({data, onSwipe = () => {}}) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const rotateY = useSharedValue(0);
    const translateX = useSharedValue(0);
    const opacity = useSharedValue(1);

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

    const onGestureEvent = useAnimatedGestureHandler({
        onActive: (event) => {
            translateX.value = event.translationX;
        },
        onEnd: (event) => {
            if (Math.abs(event.translationX) > 100) {
                opacity.value = withTiming(0, {duration: 300}, () => {
                    runOnJS(onSwipe)();
                    translateX.value = 0;
                    opacity.value = 1;
                });
            } else {
                translateX.value = withSpring(0, {damping: 20, stiffness: 90});
            }
        },
    });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateX: translateX.value}],
            opacity: opacity.value,
        };
    });

    return (
        <PanGestureHandler onGestureEvent={onGestureEvent}>
            <Animated.View style={[styles.cardContainer, animatedStyle]}>
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
            </Animated.View>
        </PanGestureHandler>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: 300,
        height: 300,
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