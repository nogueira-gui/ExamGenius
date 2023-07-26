import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
const formatTime = (time) => {
  const hours = Math.floor(time / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${hours}h${minutes}m${seconds}s`;
};

const Timer = ({ totalTimeInSeconds }) => {
  const [timeRemaining, setTimeRemaining] = useState(totalTimeInSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((time:number) => time - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <Text style={styles.timeRemaining}>Tempo restante:{formatTime(timeRemaining)}</Text>;
};
const styles = StyleSheet.create({ 
  timeRemaining: {
    color: '#fff',
    marginBottom: 20,
    textAlign: 'left',
  }
});
export default Timer;
