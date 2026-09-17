// ============================================================
// Luminous Civic — Business File & Storage Service
// Handles client-side image compression, Base64 conversion, and file formatting
// ============================================================

/**
 * Resizes and compresses an image file on the client side using HTML5 Canvas
 * to prevent exceeding Firestore's 1MB document limit.
 */
export async function compressAndResizeImage(
  file: File, 
  maxWidth: number = 400, 
  maxHeight: number = 400, 
  quality: number = 0.8
): Promise<string> {
  return new Promise((resolve, reject) => {
    // If not an image, fallback to standard reader
    if (!file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate proportional aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Convert to compressed JPEG data URL
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

export async function fileToBase64(file: File, maxDim: number = 400): Promise<string> {
  return compressAndResizeImage(file, maxDim, maxDim, 0.8);
}

export async function uploadBusinessAttachment(
  file: File, 
  businessId: string, 
  folder: 'logos' | 'reports' | 'attachments' = 'attachments'
): Promise<{ url: string; fileName: string; fileSize: number; fileType: string }> {
  // Compress images to max 600px for evidence attachments
  const base64 = await compressAndResizeImage(file, 600, 600, 0.85);
  return {
    url: base64,
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type
  };
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
