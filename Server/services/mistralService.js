const axios = require("axios");

// Replace with your actual Mistral API key
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
const MODEL = "mistral-small"; // or 'mistral-medium' if you have access
const API_URL = "https://api.mistral.ai/v1/chat/completions";

// Function to call Mistral API
async function callMistral(prompt) {
  try {
    const res = await axios.post(
      API_URL,
      {
        model: MODEL,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${MISTRAL_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.data.choices[0].message.content.trim();
  } catch (err) {
    console.error(
      "Error calling Mistral API:",
      err.response?.data || err.message
    );
    return null;
  }
}

// Classify if query is structured or unstructured
async function classifyQuery(query) {
  const prompt = `
You are a classifier. Given a natural language user query, decide if it is:
- "structured": clearly centered towards product or product type or product categories 
- "unstructured": more vague, general, or conversational intent
Query: "${query}"

Respond only with string concatenated by two strings by "-".
1st one is one word: "structured" or "unstructured".
2nd one is reason also why it is structured or unstructured,
`;

  try {
    const result = await callMistral(prompt);
    // console.log(result.split("-"));
    const answer = result.split("-")[0].toLowerCase();
    // console.log(answer);

    if (answer.trim() == "structured") {
      return "structured";
    } else {
      return "unstructured";
    }
  } catch (err) {
    console.log(err);
    return "unstructured";
  }
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Handle the query based on classification
async function handleQuery(query) {
  const type = await classifyQuery(query);

  // console.log(`\nQuery: "${query}"`);
  // console.log(`Classified as: ${type}`);
  await wait(1500);

  let prompt;

  if (type === "structured") {
    prompt = `
Query is given below. If you are here meaning query is product centric, so keep product or product type same. After extracting product type think what category it can belong from the given below list, choose only from this product_category list:
  ["Electronics", "Clothing & Accessories", "Home & Kitchen", "Furniture", "Beauty & Personal Care", "Health & Wellness", "Grocery", "Toys & Games", "Books & Stationery", "Automotive", "Sports & Outdoors", "Jewelry", "Baby Products", "Pet Supplies", "Tools & Hardware"]
After that see any popular brand name is mentioned in the query, if mentioned assign
it to the brandname. Atlast extract color or budget if mentioned.

Query: "${query}"

Respond with as a single string just below without any information or description, Use null for any field not mentioned:-
productType:Laptop , category:Electronics , brandname:hp , color:red , budget:50000

`;
  } else {
    prompt = `The user is searching for a product. Based on the query, return exactly 4 relevant product suggestions.

Each suggestion must be exactly two words:
  - First word: product type (single word like "laptop", "shirt", "cycle")
  - Second word: product category (choose only from the list below)

Allowed product categories:
["Electronics", "Clothing & Accessories", "Home & Kitchen", "Furniture", "Beauty & Personal Care", "Health & Wellness", "Grocery", "Toys & Games", "Books & Stationery", "Automotive", "Sports & Outdoors", "Jewelry", "Baby Products", "Pet Supplies", "Tools & Hardware"]

**Important constraints:**
- Do not include any explanation, quote marks, brackets, or additional text.
- Only return a plain list of 4 lines, each with the format:
  
  product_type, product_category

- If a valid category or type cannot be determined, set it to null.

User Query:
"${query}"`;
  }

  const result = await callMistral(prompt);

  if (type === "structured") {
    try {
      // console.log(result);
      return result;
    } catch (e) {
      console.log("Some went wrong in structured query", e);
      return "";
    }
  } else {
    try {
      const products = result.split("\n");
      // console.log("\nRecommended Products:", products);
      return products;
    } catch (error) {
      console.log("Some went wrong in unstructured query", error);
      return [];
    }
  }
}

module.exports = handleQuery;
