// Home.js
import { StyleSheet, SafeAreaView, Button } from 'react-native';
import Exam from './Exam';
import { useState, useEffect } from 'react';
import { getExamApi } from '../api/exam';
import { SkeletonExam } from '../components/skeletonExam';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ExamPage({ navigation, route }) {
    const [questions, setQuestions] = useState([]);

    const [time, setTime] = useState(route.params.time);
    useEffect(() => {
        async function fetchQuestions() {
            try {
                let data = null;
                const value = await AsyncStorage.getItem('current_exam');
                if (value) {
                    console.log('Recuperado de AsyncStorage');
                    data = JSON.parse(value);
                }
                if (!data) {
                    console.log('Recuperado de API');
                    let exams = [];
                    if (route.params.exam == 'CEA') {
                        exams = ["cea_prova_1.json", "cea_prova_2.json", "cea_prova_3.json", "cea_prova_4.json", "cea_prova_5.json"];
                    } else if (route.params.exam == 'CPA10') {
                        exams = ["cpa10_prova_1.json"];
                    } else if (route.params.exam == 'CPA20') {
                        exams = ["cpa20_prova_1.json"];
                    }
                    data = await getExamApi(exams[Math.floor(Math.random() * exams.length)]);
                    await AsyncStorage.setItem('current_exam', JSON.stringify(data));
                }
                data.time ? setTime(data.time) : setTime(7200);
                data.questions ? setQuestions(data.questions) : setQuestions(data);
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