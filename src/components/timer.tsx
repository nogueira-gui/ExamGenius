import { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';

const formatTime = (time:number) => {
  const hours = Math.floor(time / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${hours}h${minutes}m${seconds}s`;
};

interface TimerProps {
  totalTimeInSeconds: number;
  handleExamEnd: Function;
}

const Timer = ({ totalTimeInSeconds, handleExamEnd }:TimerProps) => {
  const [secondsRemaining, setSecondsRemaining] = useState(totalTimeInSeconds);

  useEffect(() => {
    let interval;

    if (secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prevSeconds: number) => prevSeconds - 1);
      }, 1000);
    } else {
      handleExamEnd(); // Chama a função de callback quando o tempo atingir 0
    }

    return () => {
      clearInterval(interval); // Limpa o intervalo quando o componente é desmontado
    };
  }, [secondsRemaining, handleExamEnd]);

  // return <Text style={styles.timeRemaining}>Time remaining:{formatTime(secondsRemaining)}</Text>;
  return <Text style={styles.timeRemaining}>Tempo restante:{formatTime(secondsRemaining)}</Text>;
};
const styles = StyleSheet.create({ 
  timeRemaining: {
    color: '#fff',
    marginBottom: 20,
    textAlign: 'left',
  }
});
export default Timer;
