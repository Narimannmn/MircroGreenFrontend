export const base64ToFile = (base64Data: string): File => {
  const byteCharacters = atob(base64Data.split(",")[1]);
  const byteArrays: number[] = [];

  for (let offset = 0; offset < byteCharacters.length; offset++) {
    const byte = byteCharacters.charCodeAt(offset);
    byteArrays.push(byte);
  }

  const byteArray = new Uint8Array(byteArrays);
  return new File([byteArray], "хуй", { type: "image/jpeg" }); // Adjust MIME type as necessary
};
