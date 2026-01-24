/**
 * Utility function to create a cropped image from canvas
 */

export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Creates a circular cropped image and returns it as a base64 data URL
 */
export async function getCroppedImg(imageSrc: string, pixelCrop: CropArea): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  // Set canvas size to the crop size
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Draw the cropped image
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // Create a circular mask
  const circularCanvas = document.createElement("canvas");
  const circularCtx = circularCanvas.getContext("2d");

  if (!circularCtx) {
    throw new Error("No 2d context for circular canvas");
  }

  circularCanvas.width = pixelCrop.width;
  circularCanvas.height = pixelCrop.height;

  // Draw circular clip
  circularCtx.beginPath();
  circularCtx.arc(
    pixelCrop.width / 2,
    pixelCrop.height / 2,
    Math.min(pixelCrop.width, pixelCrop.height) / 2,
    0,
    2 * Math.PI
  );
  circularCtx.closePath();
  circularCtx.clip();

  // Draw the image inside the circular clip
  circularCtx.drawImage(canvas, 0, 0);

  // Return as base64
  return circularCanvas.toDataURL("image/png");
}

/**
 * Creates a rectangular cropped image and returns it as a base64 data URL
 */
export async function getRectangularCroppedImg(
  imageSrc: string,
  pixelCrop: CropArea
): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  // Set canvas size to the crop size
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Draw the cropped image
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // Return as base64
  return canvas.toDataURL("image/png");
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });
}
