// unsplashService.js
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY; // Keep this secure if used in frontend
const getUnsplashImage = async (query) => {
  try {
    const res = await fetch(
      `https://api.unsplash.com/photos/random?query=${query}&orientation=squarish&client_id=${UNSPLASH_ACCESS_KEY}`
    );
    const data = await res.json();
    return data.urls?.regular || ""; // return image URL
  } catch (err) {
    console.error("Error fetching Unsplash image:", err);
    return null; // fallback
  }
};
module.exports = getUnsplashImage;
