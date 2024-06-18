// Home.js
import { StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';
// import { getAllResultados } from '../db/simuladoDB';
import React, { useEffect, useState } from 'react';

export default function Results({ navigation }) {
    const [resultados, setResultados] = useState([]);
    // useEffect(() => {
    //     getAllResultados()
    //         .then(data => setResultados(data))
    //         .catch(error => console.error(error));
    // }, []);

    const formatTime = (time:number) => {
        const hours = Math.floor(time / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${hours}h${minutes}m${seconds}s`;
    };

    return (
        <SafeAreaView style={styles.container}>
            {resultados.length > 0 ? (
                resultados.map((resultado, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.optionButton}
                        onPress={() => navigation.navigate('Review', { resultado })}
                    >   
                        <Text style={styles.optionText}>Pontuação: {resultado.score}</Text>
                        <Text style={styles.optionText}>Tempo usado: {formatTime(resultado.data_hora_finaliza-resultado.data_hora_iniciada)}</Text>
                    </TouchableOpacity>
                ))
            ) : (
                <Text style={[styles.optionText, 
                    { 
                        width: '100%', 
                        marginTop: '50%', 
                        textAlign: 'center', 
                        fontSize: 20 
                    }]}>
                    Nenhum resultado registrado
                </Text>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222'
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