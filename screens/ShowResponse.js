import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ActivityIndicator, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShowResponse = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchResponses = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        setError('Token not found');
        setLoading(false);
        return;
      }

      const response = await axios.get('https://4944-102-152-223-232.ngrok-free.app/api/v1/getVacResponse', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const { responses: fetchedResponses } = response.data;
      setResponses(fetchedResponses);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching responses:', error);
      setError('Error fetching responses');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResponses();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setError('');
    setResponses([]);
    fetchResponses();
  };

  const handleDeleteVacationData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        setError('Token not found');
        return;
      }

      await axios.delete('https://4944-102-152-223-232.ngrok-free.app/api/v1/deleteVacationData', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Display success message
      Alert.alert('Vous avez votre réponse, merci');

      // Refresh responses after deletion
      handleRefresh();
    } catch (error) {
      console.error('Error deleting vacation data:', error);
      Alert.alert('Error', 'Failed to delete vacation data. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : responses.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.infoText}>Vous n'avez pas de réponses aux vacances-travail</Text>
          <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
            <Text style={styles.refreshButtonText}>Refresh</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.responseContainer}>
          <Text style={styles.responseHeader}>Réponses en vacances :</Text>
          {responses.map((response, index) => (
            <Text key={index} style={[styles.responseText, { backgroundColor: '#ffdab9' }]}>
              {response}
            </Text>
          ))}
          <TouchableOpacity style={styles.button} onPress={handleDeleteVacationData}>
            <Text style={styles.buttonText}>Je suis d'accord</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  infoText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshButton: {
    
    backgroundColor: '#4682b4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  refreshButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  responseContainer: {
    backgroundColor: '#d0d0d0',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  responseHeader: {
    fontSize: 24,
    marginBottom: 20,
    color: 'black',
  },
  responseText: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
    padding: 5,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#4682b4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ShowResponse;
