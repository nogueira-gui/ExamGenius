import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import Exam from './src/pages/Exam';
import { useState, useEffect } from 'react';
import { getSimulado } from './src/api/AwsGateway';
import { SkeletonExam } from './src/components/skeletonExam';
import BannerAd from './src/components/bannerAd';

export default function App() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const data = await getSimulado();
        setQuestions(data.questions); // Atualiza o estado com as questões obtidas
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
      <Exam questions={questions}/>
      <BannerAd/>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

_activate = async () => {
  await activateKeepAwakeAsync();
  alert('Activated!');
};

_deactivate = () => {
  deactivateKeepAwake();
  alert('Deactivated!');
};

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
