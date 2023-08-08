import axios from 'axios';
import Constants from 'expo-constants';

const apiBaseUrl = Constants.manifest.extra.API_GATEWAY;

const api = axios.create({
  baseURL: apiBaseUrl
});

export async function getExam(exam:string) {
  try {
    const response = await api.get(`/file/${exam}.json`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados do simulado:', error);
    throw error;
  }
}
