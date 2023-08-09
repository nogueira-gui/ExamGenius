import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { G, Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const Donut = ({
    percentage = 75,
    radius = 50,
    strokeWidth = 10,
    duration = 500,
    color = "#fff",
    delay = 0,
    textColor = "#fff",
    max = 100
}
) => {
    const animatedValue = useSharedValue(0);
    const circleRef = React.useRef();
    const halfCircleSize = radius + strokeWidth;
    const circleCircumference = 2 * Math.PI * radius;

    const animatedProps = useAnimatedProps(() => {
        const maxPercentage = (100 * animatedValue.value) / max;
        const strokeDashoffset = circleCircumference - (circleCircumference * maxPercentage) / 100;

        return {
            strokeDashoffset: strokeDashoffset > 0 ? strokeDashoffset : circleCircumference,
        };
    });

    React.useEffect(() => {
        animatedValue.value = withTiming(percentage, {
            duration,
            delay,
            easing: Easing.linear,
        });
    }, [percentage]);

    return (
        <View>
            <Svg
                width={radius * 2}
                height={radius * 2}
                viewBox={`0 0 ${halfCircleSize * 2} ${halfCircleSize * 2}`}
            >
                <G rotation='-90' origin={`${halfCircleSize}, ${halfCircleSize}`}>
                    <Circle
                        cx='50%'
                        cy='50%'
                        stroke={color}
                        strokeWidth={strokeWidth}
                        r={radius}
                        fill='transparent'
                        strokeOpacity={0.2}
                    />
                    <AnimatedCircle
                        ref={circleRef}
                        cx='50%'
                        cy='50%'
                        stroke={color}
                        strokeWidth={strokeWidth}
                        r={radius}
                        fill='transparent'
                        strokeDasharray={circleCircumference}
                        animatedProps={animatedProps}
                        strokeLinecap="round"
                    />
                </G>
            </Svg>
        </View>
    );
}

const styles = StyleSheet.create({

});

export default Donut;
