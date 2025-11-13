# getFolderSize Utility - Quick Start

## 📋 Overview

This utility provides functions to calculate the size of folders/directories in your React Native Expo application.

## 🚀 Quick Start

### Basic Usage

```javascript
import { getFolderSize, formatBytes } from './tools/getFolderSize';
import * as FileSystem from 'expo-file-system';

// Get folder size
const size = await getFolderSize(FileSystem.documentDirectory);
console.log(`Size: ${formatBytes(size)}`); // "1.5 MB"
```

### Get All Directory Info

```javascript
import { getDirectoryInfo } from './tools/getFolderSize';

const info = await getDirectoryInfo();
console.log('Documents:', info.documentDirectory.formattedSize);
console.log('Cache:', info.cacheDirectory.formattedSize);
```

## 📦 What's Included

### Files Added
- `tools/getFolderSize.js` - Main utility functions
- `tools/testGetFolderSize.js` - Test utilities
- `components/examples/StorageInfoComponent.js` - Example React component
- `GUIDE_TAILLE_DOSSIER.md` - Comprehensive French documentation

### Dependencies
- `expo-file-system@~5.0.1` (added to package.json)

## 🔧 Functions

### `getFolderSize(folderUri)`
Calculate total size of a folder recursively.
- **Returns:** Size in bytes
- **Example:** `await getFolderSize(FileSystem.documentDirectory)`

### `formatBytes(bytes, decimals = 2)`
Format bytes into human-readable string.
- **Returns:** Formatted string (e.g., "1.5 MB")
- **Example:** `formatBytes(1536)` → "1.50 KB"

### `getDirectoryInfo()`
Get size information for all app directories.
- **Returns:** Object with directory paths and sizes
- **Example:** See "Get All Directory Info" above

## 📱 Example Component

See `components/examples/StorageInfoComponent.js` for a complete React Native component that:
- Displays storage information
- Handles loading states
- Shows errors gracefully
- Uses app styling conventions

## 📖 Full Documentation

For complete documentation in French, see `GUIDE_TAILLE_DOSSIER.md`

## ✅ Testing

Run the test function:

```javascript
import { testGetFolderSize } from './tools/testGetFolderSize';
await testGetFolderSize();
```

## 🔒 Security

✅ CodeQL scan passed - No vulnerabilities detected
- Proper error handling
- No path traversal issues
- No sensitive data exposure
