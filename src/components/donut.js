import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Svg, { G, Circle } from 'react-native-svg';
import Animated, {
    useSharedValue,
    useAnimatedProps,
    withTiming,
    Easing,
    runOnJS,
} from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedInput = Animated.createAnimatedComponent(TextInput);

const Donut = ({
    percentage,
    radius = 50,
    strokeWidth = 10,
    duration = 500,
    color = "#fff",
    delay = 0,
    textColor = "#fff",
    max = 101
}) => {
    const animatedValue = useSharedValue(0);
    const circleRef = React.useRef();
    const inputRef = React.useRef();
    const halfCircleSize = radius + strokeWidth;
    const circleCircumference = 2 * Math.PI * radius;
    const [inputValue, setInputValue] = React.useState('0');

    const animatedProps = useAnimatedProps(() => {
        const maxPercentage = (100 * animatedValue.value) / max;
        const strokeDashoffset = circleCircumference - (circleCircumference * maxPercentage) / 100;
        const value = Math.round(animatedValue.value);
        runOnJS(setInputValue)(value.toString()); // This is necessary to call a JavaScript function from the Reanimated worklet
        return {
            strokeDashoffset: strokeDashoffset,
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
                    <Circle
                        cx='50%'
                        cy='50%'
                        stroke={color}
                        strokeWidth={strokeWidth}
                        r={radius}
                        fill='transparent'
                        strokeOpacity={0.2}
                    />
                </G>
            </Svg>
            <AnimatedInput
                ref={inputRef}
                underlineColorAndroid={'transparent'}
                editable={false}
                defaultValue="0"
                style={[StyleSheet.absoluteFillObject,
                {
                    fontSize: radius / 2,
                    fontWeight: 'bold',
                    color: textColor,
                    textAlign: 'center',
                    paddingVertical: radius / 4
                }
                ]}
                value={inputValue}
            />
        </View>
    );
}
export default Donut;
