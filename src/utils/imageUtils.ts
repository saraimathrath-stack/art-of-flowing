// Image compression utility
export const compressImage = (file: File, maxWidth: number = 300, maxHeight: number = 300, quality: number = 0.8): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;

      // Enable image smoothing for better quality
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
      }

      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height);
      
      // Determine format based on file type - preserve PNG transparency
      const isPng = file.type === 'image/png' || file.name.toLowerCase().endsWith('.png');
      const format = isPng ? 'image/png' : 'image/jpeg';
      
      // Convert to base64 with appropriate format
      const compressedDataUrl = canvas.toDataURL(format, isPng ? 1.0 : quality);
      
      // Check if compressed image is still too large (limit to 1MB)
      const sizeInBytes = (compressedDataUrl.length * 3) / 4;
      const maxSize = 1024 * 1024; // 1MB
      
      if (sizeInBytes > maxSize) {
        // Try with lower quality (only for JPEG)
        if (quality > 0.3 && !isPng) {
          compressImage(file, maxWidth, maxHeight, quality - 0.2).then(resolve).catch(reject);
        } else if (isPng && maxWidth > 150) {
          // For PNG, try smaller dimensions instead of quality
          compressImage(file, maxWidth * 0.8, maxHeight * 0.8, quality).then(resolve).catch(reject);
        } else {
          reject(new Error('Image is too large even after compression'));
        }
      } else {
        resolve(compressedDataUrl);
      }
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    
    // Create object URL for the image
    const objectUrl = URL.createObjectURL(file);
    img.src = objectUrl;
  });
};

// Check localStorage quota
export const checkStorageQuota = (): number => {
  try {
    const testKey = 'quota-test';
    const testValue = 'x'.repeat(1024 * 1024); // 1MB test
    
    localStorage.setItem(testKey, testValue);
    localStorage.removeItem(testKey);
    
    return 5 * 1024 * 1024; // Assume 5MB quota
  } catch (e) {
    return 0; // No storage available
  }
};

// Get current localStorage usage
export const getStorageUsage = (): number => {
  let total = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length;
    }
  }
  return total;
};
