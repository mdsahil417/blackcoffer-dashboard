const jsonData = JSON.parse(
  fs.readFileSync("jsondata.json", "utf-8")
);

// 🔥 CLEAN DATA HERE
const cleanedData = jsonData.map(item => ({
  end_year: item.end_year ? Number(item.end_year) : null,
  intensity: item.intensity || 0,
  sector: item.sector || "Unknown",
  topic: item.topic || "Unknown",
  insight: item.insight || "",
  url: item.url || "",
  region: item.region || "Unknown",
  start_year: item.start_year ? Number(item.start_year) : null,
  impact: item.impact || "",
  added: item.added || "",
  published: item.published || "",
  country: item.country || "Unknown",
  relevance: item.relevance || 0,
  pestle: item.pestle || "Unknown",
  source: item.source || "Unknown",
  title: item.title || "",
  likelihood: item.likelihood || 0
}));

// 🔥 INSERT CLEAN DATA
await Data.deleteMany();
await Data.insertMany(cleanedData);

console.log("✅ Clean data imported");