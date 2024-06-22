// import * as SQLite from 'expo-sqlite';

// const db = SQLite.openDatabase('simuladosApp.db');

// // Método para criar a tabela de provas
// const createProvasTable = () => {
//   db.transaction(tx => {
//     tx.executeSql(`
//       CREATE TABLE IF NOT EXISTS exams (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         exam_name TEXT,
//         s3_object_name TEXT,
//         finished BOOLEAN DEFAULT 0,
//         json TEXT
//       );
//     `);
//   });
// }

// // Método para criar a tabela de resultados com chave estrangeira referenciando provas
// const createResultadosTable = () => {
//   db.transaction(tx => {
//     tx.executeSql(`
//       CREATE TABLE IF NOT EXISTS results (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         exam_id INTEGER,
//         answered_questions TEXT, -- Aqui armazenamos o array de perguntas respondidas
//         score REAL, -- Aqui armazenamos o percentual de acerto
//         date_hour_started TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         date_hour_finished TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         FOREIGN KEY (exam_id) REFERENCES exams (id)
//       );
//     `);
//   });
// }

// // Método para inserir uma prova no banco de dados
// export const insertProva = (jsonDaProva) => {
//   db.transaction(tx => {
//     tx.executeSql('INSERT INTO exams (exam_name, s3_object_name, finished, json) VALUES (?, ?, ?, ?);', [jsonDaProva.exam_name, jsonDaProva.s3_object_name, 0, jsonDaProva]);
//   });
// }

// // Método para recuperar ultima prova inserida
// export const getLastProva = () => {
//   console.log('getLastProva')
//   return new Promise((resolve, reject) => {
//     db.transaction(tx => {
//       tx.executeSql('SELECT * FROM exams ORDER BY id DESC LIMIT 1;', [], (_, { rows }) => {
//         const prova = rows._array[0];
//         resolve(prova);
//       }, (_, error) => {
//         reject(error);
//       });
//     });
//   });
// }

// export const updateProvaFinished = (id) => {
//   db.transaction(tx => {
//     tx.executeSql('UPDATE exams SET finished = 1 WHERE id = ?;', [id]);
//   });
// }

// // Método para inserir um resultado no banco de dados
// export const insertResultado = (exam_id, answered_questions, score, date_hour_started, date_hour_finished) => {
//   db.transaction(tx => {
//     tx.executeSql(`
//       INSERT INTO results (exam_id, answered_questions, score, date_hour_started, date_hour_finished)
//       VALUES (?, ?, ?, ?, ?);
//     `, [exam_id, JSON.stringify(answered_questions), score, date_hour_started, date_hour_finished]);
//   });
// }

// // Método para recuperar todos os resultados com informações da prova relacionada
// export const getAllResultados = () => {
//   return new Promise((resolve, reject) => {
//     db.transaction(tx => {
//       tx.executeSql(`
//         SELECT r.*, e.exam_name, e.json as exam_json
//         FROM results r
//         JOIN exams e ON r.exam_id = e.id;e
//       `, [], (_, { rows }) => {
//         const results = rows._array;
//         resolve(results);
//       }, (_, error) => {
//         reject(error);
//       });
//     });
//   });
// }

// createProvasTable();
// createResultadosTable();

// // Exemplo de uso do método de inserção de prova
// // const exemploJsonDaProva = '{"question": "Exemplo de pergunta", "answers": ["Opção 1", "Opção 2"], "correct_index": 0}';
// // insertProva(exemploJsonDaProva);

// // // Exemplo de uso do método de inserção de resultado
// // const perguntasRespondidasExemplo = [{ pergunta: 'Pergunta 1', resposta: 'Resposta A' }, { pergunta: 'Pergunta 2', resposta: 'Resposta B' }];
// // insertResultado(1, perguntasRespondidasExemplo, 80.0); // 80% de acerto

// // Exemplo de uso do método de recuperação de resultados com informações da prova relacionada
// // getAllResultados()
// //   .then(resultados => {
// //     console.log('Resultados recuperados:', resultados);
// //   })
// //   .catch(error => {
// //     console.error('Erro ao recuperar resultados:', error);
// //   });
