// Home.js
import { StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';
export default function Home({ navigation }) {

  return (
    <SafeAreaView style={styles.container}>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate('Results')}
      >
        <Text style={styles.optionText}>Mostrar Resultados</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate('ExamPage', { exam: 'CPA10' })}
      >
        <Text style={styles.optionText}>{`Simulado CPA10 \n\n50 questões \ntempo de prova 2horas`}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate('ExamPage', { exam: 'CPA20' })}
      >
        <Text style={styles.optionText}>{`Simulado CPA20 \n\n60 questões \ntempo de prova 2horas e 30min`}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate('ExamPage', { exam: 'CEA' })}
      >
        <Text style={styles.optionText}>{`Simulado CEA \n\n70 questões \ntempo de prova 3horas e 30min`}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  optionText: {
    color: '#fff',
    width: '90%'
  },
  optionButton: {
    flexDirection: 'row',
    width: '90%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    textAlign: 'left',
    marginVertical: '5%',
    marginHorizontal: '5%',
  },
});