// const API_URL = "https://libretranslate.de/translate"; // LibreTranslate API endpoint

// export const translateText = async (text, targetLanguage) => {
//   try {
//     const response = await fetch(API_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         q: text,
//         source: "en",
//         target: targetLanguage,
//         format: "text",
//       }),
//     });
//     const data = await response.json();
//     return data.translatedText; // Return the translated text
//   } catch (error) {
//     console.error("Error translating text:", error);
//     return text; // Return the original text if there's an error
//   }
// };
