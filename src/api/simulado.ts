const simulado1 = require("../../data/simulado1.json");
export async function getSimulado() {
  try {
    const data = simulado1;
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados do simulado:', error);
    throw error;
  }
}

const simulado2 = require("../../data/simulado2.json");
export async function getSimulado2() {
  try {
    const data = simulado2;
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados do simulado:', error);
    throw error;
  }
}