export const base64ToBlob = (base64: string, mimeType: string = "image/png") => {
  // Remove data URL prefix if present
  const base64Data = base64.includes(",") ? base64.split(",")[1] : base64;

  const byteCharacters = atob(base64Data);

  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);

  return new Blob([byteArray], { type: mimeType });
};

export const base64ToFile = (
  base64String: string,
  filename: string = "cropped-image.png",
  mimeType: string = "image/png"
): File => {
  const blob = base64ToBlob(base64String, mimeType);
  return new File([blob], filename, { type: mimeType });
};
