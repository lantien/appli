/**
 * Test script for getFolderSize utility
 * 
 * This script demonstrates and tests the getFolderSize functionality.
 * To run this test, import and call testGetFolderSize() from your component.
 */

import { getFolderSize, formatBytes, getDirectoryInfo } from './getFolderSize';
import * as FileSystem from 'expo-file-system';

/**
 * Test the getFolderSize utility
 */
export async function testGetFolderSize() {
  console.log('=== Testing getFolderSize utility ===\n');
  
  try {
    // Test 1: Get directory info
    console.log('Test 1: Getting directory information...');
    const dirInfo = await getDirectoryInfo();
    
    console.log('📁 Document Directory:');
    console.log('  Path:', dirInfo.documentDirectory.path);
    console.log('  Size:', dirInfo.documentDirectory.size, 'bytes');
    console.log('  Formatted:', dirInfo.documentDirectory.formattedSize);
    console.log('');
    
    console.log('🗂️  Cache Directory:');
    console.log('  Path:', dirInfo.cacheDirectory.path);
    console.log('  Size:', dirInfo.cacheDirectory.size, 'bytes');
    console.log('  Formatted:', dirInfo.cacheDirectory.formattedSize);
    console.log('');
    
    // Test 2: Format bytes
    console.log('Test 2: Testing formatBytes function...');
    const testSizes = [0, 512, 1024, 1536, 1048576, 1073741824];
    testSizes.forEach(size => {
      console.log(`  ${size} bytes = ${formatBytes(size)}`);
    });
    console.log('');
    
    // Test 3: Get specific folder size
    console.log('Test 3: Getting document directory size...');
    if (FileSystem.documentDirectory) {
      const docSize = await getFolderSize(FileSystem.documentDirectory);
      console.log('  Document directory size:', formatBytes(docSize));
    }
    console.log('');
    
    console.log('✅ All tests completed successfully!');
    
    return {
      success: true,
      directoryInfo: dirInfo
    };
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Example: Display storage summary
 */
export async function displayStorageSummary() {
  try {
    const info = await getDirectoryInfo();
    
    const summary = `
📊 Résumé du stockage de l'application:

📄 Dossier Documents:
   Chemin: ${info.documentDirectory.path}
   Taille: ${info.documentDirectory.formattedSize}

🗂️  Dossier Cache:
   Chemin: ${info.cacheDirectory.path}
   Taille: ${info.cacheDirectory.formattedSize}
`;
    
    console.log(summary);
    return summary;
    
  } catch (error) {
    console.error('Erreur lors de l\'affichage du résumé:', error);
    throw error;
  }
}

/**
 * Example: Check if there's enough space for a file
 */
export async function checkSpaceForFile(requiredBytes, maxStorageBytes = 100 * 1024 * 1024) {
  try {
    const docSize = await getFolderSize(FileSystem.documentDirectory);
    const available = maxStorageBytes - docSize;
    
    console.log(`Espace requis: ${formatBytes(requiredBytes)}`);
    console.log(`Espace utilisé: ${formatBytes(docSize)}`);
    console.log(`Espace disponible: ${formatBytes(available)}`);
    
    if (available >= requiredBytes) {
      console.log('✅ Espace suffisant');
      return true;
    } else {
      console.log('❌ Espace insuffisant');
      return false;
    }
    
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'espace:', error);
    throw error;
  }
}

export default testGetFolderSize;
