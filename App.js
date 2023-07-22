import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Timer from './src/component/timer';
import { getSimulado } from './src/api/simulado';
import { getSimulado2 } from './src/api/simulado';
import { TimeRemainingSkeleton, QuestionIndexSkeleton, QuestionSkeleton, ButtonsContainerSkeleton } from './src/component/skeleton';

export default function App() {
  const [questions, setQuestions] = useState([]); 
  const [questionIndex, setQuestionIndex] = useState(0);
  const [reviewedQuestions, setReviewedQuestions] = useState([]);
  const timeRemaining = 60 * 60; // Tempo de prova em segundos
  const [selectedOptions, setSelectedOptions] = useState([]); // Armazena as opções selecionadas


  useEffect(() => {
    async function fetchQuestions() {
      try {
        const data = await getSimulado2();
        setQuestions(data.questions); // Atualiza o estado com as questões obtidas
      } catch (error) {
        console.error('Erro ao buscar dados do simulado:', error);
      }
    }

    fetchQuestions();
  }, []); // O array vazio [] como segundo argumento do useEffect garante que essa função será executada apenas uma vez, quando o componente for montado.

  if (questions.length === 0) {
    // Renderiza os skeletons enquanto as informações são carregadas
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.main}>
          <TimeRemainingSkeleton />
          <QuestionIndexSkeleton />
          {/* Skeleton para representar as questões */}
          <QuestionSkeleton />
          <QuestionSkeleton />
          <QuestionSkeleton />
          <QuestionSkeleton />
          {/* Adicione mais skeletons se desejar */}
          
          <ButtonsContainerSkeleton />
          {/* Restante do código... */}
        </View>
        {/* Restante do código... */}
      </SafeAreaView>
    );
  }

  const currentQuestion = questions[questionIndex];

  const handleNextQuestion = () => {
    const nextQuestionIndex = questionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setQuestionIndex(nextQuestionIndex);
    }
  };

  const handlePreviousQuestion = () => {
    const previousQuestionIndex = questionIndex - 1;
    if (previousQuestionIndex >= 0) {
      setQuestionIndex(previousQuestionIndex);
    }
  };

  const handleConfirm = () => {
    // Aqui você pode adicionar a lógica para verificar se a resposta está correta
    // e fazer o que for necessário, como calcular pontuação, etc.
    // Por simplicidade, neste exemplo, apenas passamos para a próxima pergunta.
    setSelectedOptions([]); // Limpa as opções selecionadas antes de avançar para a próxima pergunta
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

  const handleOptionPress = (option) => {
    if (currentQuestion.isMultipleChoice) {
      let selectedOptionsCopy = [...selectedOptions];
      if (selectedOptionsCopy.includes(option)) {
        selectedOptionsCopy = selectedOptionsCopy.filter(selectedOption => selectedOption !== option);
      } else {
        selectedOptionsCopy.push(option);
      }
      setSelectedOptions(selectedOptionsCopy);
    } else {
      setSelectedOptions([option]);
    }
  };

  const renderOptions = () => {
    return currentQuestion.options.map((option, index) => {
      const isSelected = selectedOptions.includes(index);

      return (
        <TouchableOpacity
          key={index}
          style={[styles.optionButton, isSelected && styles.optionButtonSelected]}
          onPress={() => handleOptionPress(index)}
        >
          <CheckBox
            containerStyle={styles.checkbox}
            checked={isSelected}
            onPress={() => handleOptionPress(index)} // Lidar com a seleção do checkbox
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checkedColor="#4ca6ff" // Definir a cor do checkbox selecionado
            uncheckedColor="#ccc" // Definir a cor do checkbox não selecionado
          />
          <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>{option}</Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Timer totalTimeInSeconds={timeRemaining} />
        <Text style={styles.questionIndex}>Questão {questionIndex + 1} de {questions.length}</Text>

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
            <CheckBox
              containerStyle={styles.checkboxReview}
              checked={reviewedQuestions.includes(questionIndex)}
              onPress={toggleReview}
              checkedColor="#222" // Definir a cor do checkbox selecionado
              uncheckedColor="#ccc" // Definir a cor do checkbox não selecionado
            />
            <Text style={[styles.reviewText, reviewedQuestions.includes(questionIndex) && styles.reviewTextSelected]}>
              Revisar
            </Text>
          </TouchableOpacity>
        </View>

        <StatusBar style="auto" />
      </View>
      <View style={styles.bannerAd}>
        <Text>Teste</Text>
      </View>
    </SafeAreaView>
  );
}

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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
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
    margin: 0, // Remove a margem ao redor do contêiner
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
  checkboxReview: {
    marginVertical: 0,
    marginLeft: 0,
    padding: 0

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
  bannerAd: {
    height: 50,
    backgroundColor: '#455',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
