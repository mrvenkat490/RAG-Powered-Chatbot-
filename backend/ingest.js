require("dotenv").config();
const axios = require("axios");
const { QdrantClient } = require("@qdrant/js-client-rest");

const qdrant = new QdrantClient({
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY
});

const articles = [
  { title: "Tech breakthrough in AI", content: "A new AI model has surpassed previous benchmarks in natural language understanding." },
  { title: "Global economy update", content: "The IMF releases its forecast showing a steady recovery in global markets." },
  { title: "Space exploration", content: "NASA plans a new mission to study the outer planets and their moons." }
];

const getEmbedding = async (text) => {
  try {
    const res = await axios.post(
      "https://api.jina.ai/v1/embeddings",
      { model: "jina-embeddings-v2-base-en", input: text },
      { headers: { Authorization: `Bearer ${process.env.JINA_API_KEY}` } }
    );
    return res.data.data[0].embedding;
  } catch (err) {
    console.error("❌ Jina API error:", err.response?.data || err.message);
    return null;
  }
};

const ingestArticles = async () => {
  try {
    const collectionName = "news-articles";

    // Check collections
    const existingCollections = await qdrant.collectionsApi.getCollections();
    if (!existingCollections.collections.find(c => c.name === collectionName)) {
      await qdrant.collectionsApi.createCollection({
        name: collectionName,
        vectors: { size: 768, distance: "Cosine" }
      });
      console.log("✅ Qdrant collection created:", collectionName);
    } else {
      console.log("ℹ️ Collection already exists:", collectionName);
    }

    // Upsert points
    for (let i = 0; i < articles.length; i++) {
      const embedding = await getEmbedding(articles[i].content);
      if (!embedding) continue;

      await qdrant.pointsApi.upsertPoints({
        collection_name: collectionName,
        points: [
          { id: `article-${i}`, vector: embedding, payload: articles[i] }
        ]
      });

      console.log(`✅ Article added: ${articles[i].title}`);
    }

    console.log("🎉 All articles ingested!");
  } catch (err) {
    console.error("❌ Error ingesting articles:", err.message || err);
  }
};

ingestArticles();
