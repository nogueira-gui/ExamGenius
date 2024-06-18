import axios from 'axios';

const apiBaseUrl = process.env.EXPO_PUBLIC_API_GATEWAY;

interface QuestionResponse {
  current_question: string;
  num: string;
  answers: string[];
  correct_answer: string;
  correct_answer_index: number;
  difficult: string;
}


const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikd1aWxoZXJtZSBOb2d1ZWlyYSIsImlhdCI6MTUxNjIzOTAyMn0.63GPmAsQayJJJnO7vAoeEaXFT0tYjhfQdHwF3V2CZc0'
  },
});

export async function getExamApi(exam: string) {
  try {
    const response = await api.get(`/exams/${exam}`);
    // Supondo que a resposta seja um objeto que contém um array na propriedade `data`
    let questions: QuestionResponse[] = response.data;

    // Verificação de segurança para garantir que `questions` é um array
    if (!Array.isArray(questions)) {
      console.error('A resposta da API não é um array:', questions);
      return []; // Retorna um array vazio ou trata o erro conforme necessário
    }

    return questions.map((q, index) => ({
      question: q.current_question,
      options: q.answers,
      correct_index: q.correct_answer_index,
      is_multiple_choice: q.answers.length > 2,
    }));

  } catch (error) {
    console.error('Erro ao buscar dados do simulado:', error);
    throw error;
  }
}