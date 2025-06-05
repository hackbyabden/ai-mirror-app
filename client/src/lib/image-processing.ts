// Image processing utilities for face transformation effects

export interface ProcessingOptions {
  brightness?: number;
  contrast?: number;
  saturation?: number;
  hue?: number;
  blur?: number;
}

export function applyImageFilter(
  canvas: HTMLCanvasElement,
  imageElement: HTMLImageElement,
  filterType: string
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = imageElement.width;
  canvas.height = imageElement.height;
  ctx.drawImage(imageElement, 0, 0);

  switch (filterType) {
    case 'age_progression':
      applyAgingEffect(ctx, canvas.width, canvas.height);
      break;
    case 'anime':
      applyAnimeEffect(ctx, canvas.width, canvas.height);
      break;
    case 'villain':
      applyVillainEffect(ctx, canvas.width, canvas.height);
      break;
  }
}

function applyAgingEffect(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  // Apply sepia and reduce brightness for aging effect
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Sepia calculation
    data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
    data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
    data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
  }

  ctx.putImageData(imageData, 0, 0);

  // Add some noise for aging texture
  ctx.globalCompositeOperation = 'multiply';
  ctx.fillStyle = 'rgba(139, 139, 122, 0.1)';
  ctx.fillRect(0, 0, width, height);
  ctx.globalCompositeOperation = 'source-over';
}

function applyAnimeEffect(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  // Increase saturation and add slight cartoon effect
  for (let i = 0; i < data.length; i += 4) {
    // Boost colors
    data[i] = Math.min(255, data[i] * 1.2);     // Red
    data[i + 1] = Math.min(255, data[i + 1] * 1.1); // Green
    data[i + 2] = Math.min(255, data[i + 2] * 1.3); // Blue
  }

  ctx.putImageData(imageData, 0, 0);
}

function applyVillainEffect(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  // Dark, high contrast effect
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    
    if (avg < 128) {
      // Darken dark areas
      data[i] *= 0.7;
      data[i + 1] *= 0.7;
      data[i + 2] *= 0.7;
    } else {
      // Increase contrast in bright areas
      data[i] = Math.min(255, data[i] * 1.2);
      data[i + 1] = Math.min(255, data[i + 1] * 1.2);
      data[i + 2] = Math.min(255, data[i + 2] * 1.2);
    }
  }

  ctx.putImageData(imageData, 0, 0);

  // Add red tint overlay
  ctx.globalCompositeOperation = 'multiply';
  ctx.fillStyle = 'rgba(139, 0, 0, 0.1)';
  ctx.fillRect(0, 0, width, height);
  ctx.globalCompositeOperation = 'source-over';
}

export function createAgeProgressionPreview(originalImage: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      applyImageFilter(canvas, img, 'age_progression');
      resolve(canvas.toDataURL());
    };
    img.src = originalImage;
  });
}
