/**
 * Example React Native Component using getFolderSize utility
 * 
 * This is a demonstration of how to integrate the getFolderSize utility
 * into a React Native component. You can add this to any existing screen
 * like the Settings or Account screen.
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { getDirectoryInfo, formatBytes, getFolderSize } from '../../tools/getFolderSize';
import * as FileSystem from 'expo-file-system';

class StorageInfoComponent extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      loading: false,
      documentSize: null,
      cacheSize: null,
      totalSize: null,
      error: null
    };
  }
  
  /**
   * Load directory size information
   */
  async loadStorageInfo() {
    this.setState({ loading: true, error: null });
    
    try {
      const dirInfo = await getDirectoryInfo();
      
      this.setState({
        documentSize: dirInfo.documentDirectory.formattedSize,
        cacheSize: dirInfo.cacheDirectory.formattedSize,
        totalSize: formatBytes(
          dirInfo.documentDirectory.size + dirInfo.cacheDirectory.size
        ),
        loading: false
      });
      
    } catch (error) {
      console.error('Error loading storage info:', error);
      this.setState({ 
        loading: false,
        error: 'Impossible de charger les informations de stockage'
      });
    }
  }
  
  /**
   * Show storage info in an alert
   */
  showStorageAlert = async () => {
    this.setState({ loading: true });
    
    try {
      const info = await getDirectoryInfo();
      
      const message = `
📁 Documents: ${info.documentDirectory.formattedSize}
🗂️ Cache: ${info.cacheDirectory.formattedSize}
📊 Total: ${formatBytes(info.documentDirectory.size + info.cacheDirectory.size)}
      `;
      
      Alert.alert(
        'Stockage de l\'application',
        message,
        [{ text: 'OK' }]
      );
      
      this.setState({ loading: false });
      
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de charger les informations');
      this.setState({ loading: false });
    }
  }
  
  componentDidMount() {
    // Optionally load storage info when component mounts
    // this.loadStorageInfo();
  }
  
  render() {
    const { loading, documentSize, cacheSize, totalSize, error } = this.state;
    
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Informations de stockage</Text>
        
        {/* Button to check storage */}
        <TouchableOpacity
          style={styles.button}
          onPress={this.showStorageAlert}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              📊 Vérifier le stockage
            </Text>
          )}
        </TouchableOpacity>
        
        {/* Display storage info if loaded */}
        {documentSize && (
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>📄 Documents:</Text>
              <Text style={styles.infoValue}>{documentSize}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>🗂️ Cache:</Text>
              <Text style={styles.infoValue}>{cacheSize}</Text>
            </View>
            
            <View style={[styles.infoRow, styles.totalRow]}>
              <Text style={[styles.infoLabel, styles.totalLabel]}>📊 Total:</Text>
              <Text style={[styles.infoValue, styles.totalValue]}>{totalSize}</Text>
            </View>
          </View>
        )}
        
        {/* Show error if any */}
        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  button: {
    backgroundColor: '#2F7DE1',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoLabel: {
    fontSize: 15,
    color: '#666',
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  totalRow: {
    borderBottomWidth: 0,
    borderTopWidth: 2,
    borderTopColor: '#2F7DE1',
    marginTop: 5,
  },
  totalLabel: {
    fontWeight: 'bold',
    color: '#2F7DE1',
  },
  totalValue: {
    fontWeight: 'bold',
    color: '#2F7DE1',
  },
  errorText: {
    color: '#ff0000',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default StorageInfoComponent;
