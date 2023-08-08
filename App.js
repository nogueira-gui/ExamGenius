import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import Exam from './src/pages/Exam';
import { useState, useEffect } from 'react';
import { getExam } from './src/api/exam';
import { SkeletonExam } from './src/components/skeletonExam';
import BannerAd from './src/components/bannerAd';

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [time, setTime] = useState(3600);
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const exam = "practioner"
        const data = await getExam(exam);
        data.time && setTime(data.time);
        data.questions && setQuestions(data.questions); // Atualiza o estado com as questões obtidas
        
      } catch (error) {
        console.error('Erro ao buscar dados do simulado:', error);
      }
    }

    fetchQuestions();
  }, []); // O array vazio [] como segundo argumento do useEffect garante que essa função será executada apenas uma vez, quando o componente for montado.

  if (questions.length === 0) {
    // Renderiza os skeletons enquanto as informações são carregadas
    return <SkeletonExam />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Exam questions={questions} time={time}/>
      <BannerAd/>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  bannerAd: {
    height: 50,
    backgroundColor: '#455',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
