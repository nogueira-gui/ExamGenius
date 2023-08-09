import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const SkeletonOscillating = ({ oscillate, duration = 1000, skeletonStyle }) => {
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        let animation;
        if (oscillate) {
            animation = Animated.loop(
                Animated.sequence([
                    Animated.timing(opacity, {
                        toValue: 1,
                        duration: duration / 2,
                        useNativeDriver: false,
                    }),
                    Animated.timing(opacity, {
                        toValue: 0.3,
                        duration: duration / 2,
                        useNativeDriver: false,
                    }),
                ]),
                { iterations: -1 }
            );
            animation.start();
        }
        return () => {
            animation && animation.stop();
        };
    }, [oscillate, duration, opacity]);

    return (
        <Animated.View style={[skeletonStyle, { opacity }]} />
    );
};

const TimeRemainingSkeleton = () => {
    const shouldOscillate = true;

    return (
        <View style={styles.timeRemainingContainer}>
            <SkeletonOscillating oscillate={true} duration={1000} skeletonStyle={[styles.timeRemainingSkeleton,{width:'30%'}]}/>
            <SkeletonOscillating oscillate={shouldOscillate} skeletonStyle={styles.timeRemainingSkeleton}/>
            <SkeletonOscillating oscillate={shouldOscillate} skeletonStyle={styles.timeRemainingSkeleton}/>
            <SkeletonOscillating oscillate={shouldOscillate} skeletonStyle={styles.timeRemainingSkeleton}/>
        </View>
    );
};

const QuestionIndexSkeleton = () => {
    const shouldOscillate = true;
    return (
        <View style={styles.questionIndexContainer}>
            <SkeletonOscillating oscillate={shouldOscillate} skeletonStyle={styles.questionIndexSkeleton}/>
        </View>
    );
};

const QuestionSkeleton = () => {
    // Gerar um array com 4 elementos e preenchê-lo com valores booleanos aleatórios (true ou false)
    const randomLines = Array.from({ length: 2 }, () => Math.random() >= 0.5);
    const shouldOscillate = true;

    return (
        <View style={styles.questionContainer}>
            <SkeletonOscillating oscillate={shouldOscillate} duration={1000} skeletonStyle={styles.questionHeader}/>
            {randomLines[0] && <SkeletonOscillating oscillate={shouldOscillate} skeletonStyle={styles.optionSkeleton}/>}
            {randomLines[1] && <SkeletonOscillating oscillate={shouldOscillate} duration={1000} skeletonStyle={styles.optionSkeleton}/>}
            {randomLines[2] && <SkeletonOscillating oscillate={shouldOscillate} duration={1000} skeletonStyle={styles.optionSkeleton}/>}
        </View>
    );
};

const ButtonsContainerSkeleton = () => {
    return (
        <View style={styles.buttonsContainer}>
            <View style={styles.buttonSkeleton} />
            <View style={styles.buttonSkeleton} />
            <View style={styles.buttonSkeleton} />
        </View>
    );
};

const styles = StyleSheet.create({
    timeRemainingContainer: {
        marginVertical: 10,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#333',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '90%',
    },
    timeRemainingSkeleton: {
        height: 20,
        width: '10%',
        backgroundColor: '#444',
        marginHorizontal: 2,
        borderRadius: 8,
    },
    questionIndexContainer: {
        marginVertical: 10,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#333',
        width: '90%'
    },
    questionIndexSkeleton: {
        height: 20,
        width: '30%',
        backgroundColor: '#444',
        borderRadius: 8,
    },
    questionContainer: {
        marginVertical: 10,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#333',
        width: '90%'
    },
    questionHeader: {
        height: 20,
        width: '50%',
        backgroundColor: '#444',
        borderRadius: 8,
    },
    optionSkeleton: {
        height: 20,
        width: '100%',
        backgroundColor: '#444',
        borderRadius: 8,
        marginVertical: 5,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    buttonSkeleton: {
        width: '30%',
        height: 40,
        backgroundColor: '#444',
        borderRadius: 8,
    },
});

export { TimeRemainingSkeleton, QuestionIndexSkeleton, QuestionSkeleton, ButtonsContainerSkeleton };
