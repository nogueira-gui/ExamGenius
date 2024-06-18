// Home.js
import { StyleSheet, SafeAreaView, Button } from 'react-native';
import Exam from './Exam';
import { useState, useEffect } from 'react';
import { getExamApi } from '../api/exam';
import { SkeletonExam } from '../components/skeletonExam';

export default function ExamPage({ navigation, route }) {
    const [questions, setQuestions] = useState([]);

    const [time, setTime] = useState(route.params.time);
    useEffect(() => {
        async function fetchQuestions() {
            try {
                if (route.params.exam == 'CEA') {
                    const data = await getExamApi("cea_prova_2.json");
                    data.time ? setTime(data.time): setTime(7200);
                    data.questions ? setQuestions(data.questions) : setQuestions(data); // Atualiza o estado com as questões obtidas
                }
            } catch (error) {
                console.error('Erro ao buscar dados do simulado:', error);
            }
        }

        fetchQuestions();
    }, []); // O array vazio [] como segundo argumento do useEffect garante que essa função será executada apenas uma vez, quando o componente for montado.

    function handleReview(review) {
        navigation.navigate('Review', { review, questions });
    }

    if (questions.length === 0) {
        // Renderiza os skeletons enquanto as informações são carregadas
        return <SkeletonExam />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Exam questions={questions} time={time} handleReview={handleReview} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222',
    }
});