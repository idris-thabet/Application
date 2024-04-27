

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Traitement = () => {
  const [vacationRequests, setVacationRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const userRole = await AsyncStorage.getItem('userRole');
      
      if (userRole === 'admin') {
        const token = await AsyncStorage.getItem('token');
        
        if (!token) {
          throw new Error('Authorization token not found');
        }

        const response = await fetch('https://4944-102-152-223-232.ngrok-free.app/api/v1/getVacationRequest', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        const data = await response.json();
        
        if (data && data.vacations) {
          setVacationRequests(data.vacations);
        } else {
          console.warn('No vacation requests found.');
        }
      } else {
        console.warn('User is not an admin.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data');
    } finally {
      setLoading(false);
      setRefreshing(false); // Ensure refreshing state is reset
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateRequest = async (email, newResponse) => {
    try {
      const token = await AsyncStorage.getItem('token');
          
      if (!token) {
        throw new Error('Authorization token not found');
      }
  
      const response = await fetch('https://4944-102-152-223-232.ngrok-free.app/api/v1/updateVacationRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email, response: newResponse }),
      });
      const data = await response.json();
  
      if (data.updatedVacation) {
        // Re-fetch data after successful update
        fetchData();
        // Show an alert based on the response
        Alert.alert('Succès', `Demande ${newResponse === 'accepted' ? 'approuvée' : 'rejetée'} avec succès.`);
      } else {
        // Handle error case if needed
        Alert.alert('Erreur', 'Échec de la demande de mise à jour.');
      }
    } catch (error) {
      console.error('Error updating request:', error);
      Alert.alert('Erreur', 'Échec de la demande de mise à jour. Veuillez réessayer plus tard.');
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchData(); // Call fetchData to refresh the data
    } finally {
      setRefreshing(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.refreshButton}
        onPress={handleRefresh}
        disabled={refreshing} // Disable button while refreshing
      >
        <Text style={styles.refreshButtonText}>Refresh</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {refreshing && <ActivityIndicator size="large" color="#0000ff" />}
        {vacationRequests.map(request => (
          <View key={request._id} style={styles.requestContainer}>
            <View style={styles.requestContent}>
              <Text style={[styles.textWithBackground, { backgroundColor: '#ffdab9', fontSize: 16 }]}>Email: {request.email}</Text>
              <Text style={[styles.textWithBackground, { backgroundColor: '#ffdab9', fontSize: 16 }]}>Username: {request.username}</Text>
              <Text>Type: {request.type}</Text>
              <Text>Start: {request.start}</Text>
              <Text>End: {request.end}</Text>
              {/* <Text>Response: {request.response}</Text> */}
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: 'red' }]}
                onPress={() => handleUpdateRequest(request.email, 'accepted')}
                disabled={refreshing} // Disable button while refreshing
              >
                <Text style={styles.actionButtonText}>Approve</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: 'green' }]}
                onPress={() => handleUpdateRequest(request.email, 'rejected')}
                disabled={refreshing} // Disable button while refreshing
              >
                <Text style={styles.actionButtonText}>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Set background color of the entire screen to black
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20, // Add padding for spacing
    backgroundColor: 'black', // Set background color of scroll area to black
  },
  refreshButton: {
    backgroundColor: '#4682b4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    width: '30%', // Set the width of the refresh button (adjust percentage as needed)
    alignSelf: 'center', // Center the button horizontally
  },
  refreshButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  requestContainer: {
    backgroundColor: '#d0d0d0', // Set request container background color to gray
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    width: '80%', // Set the width of the request container (adjust percentage as needed)
    alignSelf: 'center', // Center the container horizontally
  },
  requestContent: {
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  textWithBackground: {
    backgroundColor: '#ffdab9', // Set background color to a warm color (e.g., peach)
    padding: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: 'red', // Default color, will be overridden for each button
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Traitement;

