
import { SafeAreaView, View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Donut from '../components/donut';

interface Question {
    question: string;
    options: string[];
    correct_index: number;
    is_multiple_choice?: boolean;
}

interface Review {
    selectedOptions: { [key: number]: number[] };
    reviewedQuestions: number[];
    timeRemaining: number;
    score: number | null;
}

const ReviewScreen = ({ route }) => {
    const questions: Question[] = route.params.questions;
    const review: Review = route.params.review;
    const verifyIsSelected = (optionIndex: number, questionIndex: number) => {
        return review.selectedOptions[questionIndex] && review.selectedOptions[questionIndex].includes(optionIndex);
    }

    const verifyCorrectAnswer = (optionIndex: number, questionIndex: number) => {
        return questions[questionIndex].correct_index === optionIndex;
    }

    const renderQuestionResult = (optionIndex: number, questionIndex: number) => {
        if (verifyCorrectAnswer(optionIndex, questionIndex)) {
            return <Text style={{ color: '#fff' }}> ✅</Text>;
        }
        if (verifyIsSelected(optionIndex, questionIndex)) {
            return <Text style={{ color: '#fff' }}>❌</Text>;
        }
        return null;
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.statistcs}>
                    <Text style={{ color: '#fff' }}>Pontuação: {review.score}</Text>
                    <Donut percentage={review.score}/>
                    <Text style={{ color: '#fff' }}>Tempo: {review.timeRemaining}</Text>
                </View>
                {questions.map((q, index) => (
                    <View key={index}>
                        <Text style={{ color: '#fff', marginTop: 50, marginBottom: 5 }}>
                            Questão {index + 1}: {review.reviewedQuestions.includes(index) && 'Marcada para revisar 🚩'}
                            {verifyCorrectAnswer(review.selectedOptions[index][0], index) ? ' - Correta' : ' - Errada'}
                        </Text>
                        <Text style={styles.question}>{q.question}</Text>
                        {questions[index].options.map((option, i) => (
                            <View style={[styles.optionButton, verifyIsSelected(i, index) && styles.optionButtonSelected]} key={i}>
                                <Text style={{ color: '#fff' }}>{option}</Text>
                                {renderQuestionResult(i, index)}
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    statistcs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 80,
    },
    question: {
        color: '#fff',
        marginBottom: 20,
        textAlign: 'left',
    },
    container: {
        flex: 1,
        backgroundColor: '#222',
        paddingHorizontal: 15,
    },
    optionButton: {
        flexDirection: 'row',
        width: '90%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        padding: 5,
        textAlign: 'left'
      },
      optionButtonSelected: {
        borderColor: '#4ca6ff',
      },
});

export default ReviewScreen;