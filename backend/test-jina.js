const axios = require("axios");
require("dotenv").config();

(async () => {
  try {
    const res = await axios.post(
      "https://api.jina.ai/v1/embeddings",
      { model: "jina-embeddings-v2-base-en", input: "Hello world" },
      { headers: { Authorization: `Bearer ${process.env.JINA_API_KEY}` } }
    );
    console.log("✅ Jina OK, embedding length:", res.data.data[0].embedding.length);
  } catch (err) {
    console.error("❌ Jina API failed:", err.response?.data || err.message);
  }
})();
