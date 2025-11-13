# Connaître la taille d'un dossier

Ce guide explique comment utiliser l'utilitaire `getFolderSize` pour connaître la taille d'un dossier dans l'application.

## Installation

L'utilitaire est déjà inclus dans le projet. Il utilise `expo-file-system` pour accéder au système de fichiers.

## Utilisation de base

### Importer l'utilitaire

```javascript
import { getFolderSize, formatBytes, getDirectoryInfo } from './tools/getFolderSize';
import * as FileSystem from 'expo-file-system';
```

### Calculer la taille d'un dossier

```javascript
// Obtenir la taille du dossier de documents
const size = await getFolderSize(FileSystem.documentDirectory);
console.log(`Taille du dossier: ${size} octets`);

// Avec formatage lisible
console.log(`Taille du dossier: ${formatBytes(size)}`);
```

### Obtenir les informations des dossiers de l'application

```javascript
// Obtenir les tailles de tous les dossiers principaux
const dirInfo = await getDirectoryInfo();

console.log('Dossier de documents:', dirInfo.documentDirectory.formattedSize);
console.log('Dossier de cache:', dirInfo.cacheDirectory.formattedSize);
```

## Exemples

### Exemple 1: Afficher la taille du cache

```javascript
import { getFolderSize, formatBytes } from './tools/getFolderSize';
import * as FileSystem from 'expo-file-system';

async function displayCacheSize() {
  try {
    const cacheSize = await getFolderSize(FileSystem.cacheDirectory);
    alert(`Taille du cache: ${formatBytes(cacheSize)}`);
  } catch (error) {
    console.error('Erreur:', error);
    alert('Impossible de calculer la taille du cache');
  }
}
```

### Exemple 2: Vérifier l'espace utilisé avant de télécharger

```javascript
import { getFolderSize, formatBytes } from './tools/getFolderSize';
import * as FileSystem from 'expo-file-system';

async function checkStorageBeforeDownload(requiredSize) {
  try {
    const currentSize = await getFolderSize(FileSystem.documentDirectory);
    const availableSpace = 100 * 1024 * 1024; // 100 MB (exemple)
    
    if (currentSize + requiredSize > availableSpace) {
      alert(`Espace insuffisant. Utilisé: ${formatBytes(currentSize)}`);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Erreur:', error);
    return false;
  }
}
```

### Exemple 3: Afficher un résumé du stockage

```javascript
import { getDirectoryInfo } from './tools/getFolderSize';

async function showStorageSummary() {
  try {
    const info = await getDirectoryInfo();
    
    const summary = `
    📁 Résumé du stockage:
    
    📄 Documents: ${info.documentDirectory.formattedSize}
    🗂️ Cache: ${info.cacheDirectory.formattedSize}
    `;
    
    alert(summary);
  } catch (error) {
    console.error('Erreur:', error);
  }
}
```

## API Reference

### `getFolderSize(folderUri)`

Calcule la taille totale d'un dossier de manière récursive.

**Paramètres:**
- `folderUri` (string): L'URI du dossier à mesurer

**Retourne:**
- `Promise<number>`: La taille totale en octets

**Exemple:**
```javascript
const size = await getFolderSize(FileSystem.documentDirectory);
```

### `formatBytes(bytes, decimals)`

Formate les octets en chaîne lisible (KB, MB, GB, etc.).

**Paramètres:**
- `bytes` (number): Le nombre d'octets à formater
- `decimals` (number, optionnel): Nombre de décimales (défaut: 2)

**Retourne:**
- `string`: Chaîne formatée (ex: "1.5 MB")

**Exemple:**
```javascript
formatBytes(1024); // "1 KB"
formatBytes(1536, 2); // "1.50 KB"
formatBytes(1048576); // "1 MB"
```

### `getDirectoryInfo()`

Obtient les informations sur les dossiers principaux de l'application.

**Retourne:**
- `Promise<Object>`: Objet contenant les informations des dossiers

**Exemple:**
```javascript
const info = await getDirectoryInfo();
console.log(info.documentDirectory.formattedSize);
console.log(info.cacheDirectory.formattedSize);
```

## Notes importantes

1. **Permissions**: L'accès au système de fichiers nécessite les permissions appropriées
2. **Performance**: Le calcul peut prendre du temps pour les grands dossiers
3. **Async/Await**: Toutes les fonctions sont asynchrones et doivent être utilisées avec `await` ou `.then()`
4. **Gestion des erreurs**: Toujours utiliser try/catch pour gérer les erreurs potentielles

## Dossiers disponibles

Avec Expo, vous avez accès à plusieurs dossiers:

- `FileSystem.documentDirectory` - Documents de l'application
- `FileSystem.cacheDirectory` - Cache de l'application
- `FileSystem.bundleDirectory` - Ressources de l'application (lecture seule)

## Dépannage

### "Folder does not exist"
Le dossier spécifié n'existe pas. Vérifiez le chemin.

### Erreur de permission
L'application n'a pas les permissions nécessaires pour accéder au dossier.

### Performance lente
Pour les très grands dossiers, envisagez d'implémenter une barre de progression ou de limiter la profondeur de récursion.
