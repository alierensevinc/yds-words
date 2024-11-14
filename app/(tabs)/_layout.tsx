import React from 'react';
import {useColorScheme} from '@/hooks/useColorScheme';
import HomeScreen from "@/app/(tabs)/index";
import {GestureHandlerRootView} from "react-native-gesture-handler";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <HomeScreen/>
        </GestureHandlerRootView>
    );
}
