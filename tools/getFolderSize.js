import * as FileSystem from 'expo-file-system';

/**
 * Calculate the total size of a folder/directory
 * 
 * @param {string} folderUri - The URI of the folder to measure (e.g., FileSystem.documentDirectory)
 * @returns {Promise<number>} - Promise that resolves to the total size in bytes
 * 
 * @example
 * // Get size of document directory
 * const size = await getFolderSize(FileSystem.documentDirectory);
 * console.log(`Folder size: ${formatBytes(size)}`);
 * 
 * @example
 * // Get size of cache directory
 * const cacheSize = await getFolderSize(FileSystem.cacheDirectory);
 * console.log(`Cache size: ${formatBytes(cacheSize)}`);
 */
export async function getFolderSize(folderUri) {
  try {
    // Check if the folder exists
    const info = await FileSystem.getInfoAsync(folderUri);
    
    if (!info.exists) {
      throw new Error(`Folder does not exist: ${folderUri}`);
    }
    
    if (!info.isDirectory) {
      // If it's a file, return its size
      return info.size || 0;
    }
    
    // Read directory contents
    const contents = await FileSystem.readDirectoryAsync(folderUri);
    
    // Calculate total size by recursively checking all files and subdirectories
    let totalSize = 0;
    
    for (const item of contents) {
      const itemUri = folderUri + (folderUri.endsWith('/') ? '' : '/') + item;
      const itemInfo = await FileSystem.getInfoAsync(itemUri);
      
      if (itemInfo.exists) {
        if (itemInfo.isDirectory) {
          // Recursively get size of subdirectory
          totalSize += await getFolderSize(itemUri);
        } else {
          // Add file size
          totalSize += itemInfo.size || 0;
        }
      }
    }
    
    return totalSize;
    
  } catch (error) {
    console.error('Error calculating folder size:', error);
    throw error;
  }
}

/**
 * Format bytes into a human-readable string
 * 
 * @param {number} bytes - The number of bytes to format
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} - Formatted string (e.g., "1.5 MB")
 * 
 * @example
 * formatBytes(1024) // "1 KB"
 * formatBytes(1536, 2) // "1.50 KB"
 * formatBytes(1048576) // "1 MB"
 */
export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Get information about common app directories
 * 
 * @returns {Promise<Object>} - Promise that resolves to an object with directory sizes
 * 
 * @example
 * const dirInfo = await getDirectoryInfo();
 * console.log('Document Directory:', dirInfo.documentDirectory);
 * console.log('Cache Directory:', dirInfo.cacheDirectory);
 */
export async function getDirectoryInfo() {
  const info = {
    documentDirectory: {
      path: FileSystem.documentDirectory,
      size: 0,
      formattedSize: '0 Bytes'
    },
    cacheDirectory: {
      path: FileSystem.cacheDirectory,
      size: 0,
      formattedSize: '0 Bytes'
    }
  };
  
  try {
    // Get document directory size
    if (FileSystem.documentDirectory) {
      const docSize = await getFolderSize(FileSystem.documentDirectory);
      info.documentDirectory.size = docSize;
      info.documentDirectory.formattedSize = formatBytes(docSize);
    }
  } catch (error) {
    console.warn('Could not get document directory size:', error.message);
  }
  
  try {
    // Get cache directory size
    if (FileSystem.cacheDirectory) {
      const cacheSize = await getFolderSize(FileSystem.cacheDirectory);
      info.cacheDirectory.size = cacheSize;
      info.cacheDirectory.formattedSize = formatBytes(cacheSize);
    }
  } catch (error) {
    console.warn('Could not get cache directory size:', error.message);
  }
  
  return info;
}

export default getFolderSize;
