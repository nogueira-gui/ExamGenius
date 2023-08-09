import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Timer from '../components/timer';
import CheckBoxElement from '../components/checkbox';
import Donut from '../components/donut';

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
  isMultipleChoice: boolean;
}

interface ExamProps {
  questions: Question[];
  time: number;
}

const Exam: React.FC<ExamProps> = ({ questions, time }) => {
  const timeRemaining = time; // Tempo de prova em segundos
  const [questionIndex, setQuestionIndex] = useState(0);
  const [reviewedQuestions, setReviewedQuestions] = useState<number[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: number[] }>({});
  const [examFinished, setExamFinished] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  
  const currentQuestion = questions[questionIndex];

  useEffect(() => {
    // Lógica para finalizar o exame após responder todas as questões
    if (questionIndex >= questions.length) {
      handleExamEnd();
    }
  }, [questionIndex, time]);

  const handleExamEnd = () => {
    // Verifica as respostas selecionadas com as respostas corretas
    const calculatedScore = calculateScore();
    setScore(calculatedScore);

    // Marca o exame como finalizado
    setExamFinished(true);
  };

  // Restante do código permanece igual...

  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      const selectedOptionsForQuestion = selectedOptions[index] || [];
      if (question.isMultipleChoice) {
        const isCorrect = selectedOptionsForQuestion.length === question.correctIndex.length &&
          selectedOptionsForQuestion.every(option => question.correctIndex.includes(option));
        if (isCorrect) {
          correctAnswers++;
        }
      } else {
        if (selectedOptionsForQuestion.length === 1 && selectedOptionsForQuestion[0] === question.correctIndex) {
          correctAnswers++;
        }
      }
    });
    return (correctAnswers / questions.length) * 100;
  };

  const handlePreviousQuestion = () => {
    const previousQuestionIndex = questionIndex - 1;
    if (previousQuestionIndex >= 0) {
      setQuestionIndex(previousQuestionIndex);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestionIndex = questionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setQuestionIndex(nextQuestionIndex);
    } else {
      // Se chegarmos na última questão, o exame será finalizado
      handleExamEnd();
    }
  };

  const handleConfirm = () => {
    // Aqui você pode adicionar a lógica para verificar se a resposta está correta
    // e fazer o que for necessário, como calcular pontuação, etc.
    // Por simplicidade, neste exemplo, apenas passamos para a próxima pergunta.
    handleNextQuestion();
  };

  const toggleReview = () => {
    const isCurrentlyReviewed = reviewedQuestions.includes(questionIndex);
    if (isCurrentlyReviewed) {
      setReviewedQuestions(reviewedQuestions.filter(qIndex => qIndex !== questionIndex));
    } else {
      setReviewedQuestions([...reviewedQuestions, questionIndex]);
    }
  };

  const handleOptionPress = (optionIndex: number) => {
    if (currentQuestion.isMultipleChoice) {
      setSelectedOptions({
        ...selectedOptions,
        [questionIndex]: toggleOptionSelection(selectedOptions[questionIndex] || [], optionIndex),
      });
    } else {
      setSelectedOptions({
        ...selectedOptions,
        [questionIndex]: [optionIndex],
      });
    }
  };

  const toggleOptionSelection = (selectedOptions: number[], optionIndex: number) => {
    if (selectedOptions.includes(optionIndex)) {
      return selectedOptions.filter(selectedOption => selectedOption !== optionIndex);
    } else {
      return [...selectedOptions, optionIndex];
    }
  };

  const renderOptions = () => {
    const selectedOptionsForQuestion = selectedOptions[questionIndex] || [];

    return currentQuestion.options.map((option, index) => {
      const isSelected = selectedOptionsForQuestion.includes(index);

      return (
        <TouchableOpacity
          key={index}
          style={[styles.optionButton, isSelected && styles.optionButtonSelected]}
          onPress={() => handleOptionPress(index)}
        >
          <CheckBoxElement 
            styles={styles.checkbox} 
            isSelected={isSelected} 
            checkedIcon={'dot-circle-o'}
            uncheckedIcon={'circle-o'} 
            color={isSelected ? '#4ca6ff' : '#ccc'}
            size={24} 
          />
          <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>{option}</Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {examFinished ? (
        <View style={styles.examFinishedContainer}>
          <Text style={styles.examFinishedText}>{(score && score > 70) ? '😎' : '🙁'}</Text>
          <Text style={styles.examFinishedText}>Exam Finished!</Text>
          {score && score > 70 ? (
            <>
              <Text style={styles.passedText}>Congratulations! You passed the exam with a score of</Text>
              <Donut percentage={score}	/>
            </>
          ) : (
            <>
              <Text style={styles.failedText}>Unfortunately, you did not pass the exam. Your score is</Text>
              <Donut percentage={score} />
            </>
          )}
        </View>
      ) : (
        <View style={styles.main}>
          <Timer totalTimeInSeconds={timeRemaining} handleExamEnd={handleExamEnd} />

          <Text style={styles.questionIndex}>Question {questionIndex + 1} of {questions.length}</Text>

          <Text style={styles.question}>{currentQuestion.question}</Text>

          {renderOptions()}
          <View style={styles.buttonContainer}>
            <TouchableOpacity disabled={!(questionIndex > 0)}
              style={[styles.button, styles.buttonBack]}
              onPress={handlePreviousQuestion}>
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleConfirm} style={[styles.button, styles.buttonConfirm]}>
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.reviewContainer, reviewedQuestions.includes(questionIndex) && styles.buttonReviewed]}
              onPress={toggleReview}
            >
              <CheckBoxElement
                styles={styles.checkbox} 
                isSelected={reviewedQuestions.includes(questionIndex)} 
                checkedIcon={'dot-circle-o'}
                uncheckedIcon={'circle-o'} 
                color={reviewedQuestions.includes(questionIndex) ? '#121212' : '#ccc'}
                size={24} 
              />
              <Text style={[styles.reviewText, reviewedQuestions.includes(questionIndex) && styles.reviewTextSelected]}>
                Revisar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionIndex: {
    color: '#fff',
    marginBottom: 10,
    textAlign: 'left',
  },
  question: {
    color: '#fff',
    marginBottom: 20,
    textAlign: 'left',
  },
  optionButton: {
    flexDirection: 'row',
    width: '90%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    textAlign: 'left'
  },
  optionButtonSelected: {
    borderColor: '#4ca6ff',
    // backgroundColor: '#4ca6ff',
  },
  optionText: {
    color: '#fff',
    width: '90%'
  },
  optionTextSelected: {
    color: '#4ca6ff',
  },
  checkbox: {
    backgroundColor: 'transparent', // Define a cor de fundo do contêiner do CheckBox como transparente
    borderWidth: 0, // Remove a borda ao redor do contêiner
    margin: 0,
    marginRight: 10,// Remove a margem ao redor do contêiner
    padding: 0, // Remove o preenchimento interno do contêiner
  },
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#fff",
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  reviewText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 0,
  },
  reviewTextSelected: {
    color: '#222'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '94%',
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 100,
  },
  buttonBack: {
    backgroundColor: '#4ca6ff',
  },
  buttonConfirm: {
    backgroundColor: '#50c356',
  },
  buttonReviewed: {
    backgroundColor: '#ffaa00',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  examFinishedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  examFinishedText: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
  },
  passedText: {
    color: '#50c356',
    fontSize: 18,
    textAlign: 'center',
  },
  failedText: {
    color: '#ff0000',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Exam;
