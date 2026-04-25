const express = require("express");
const router = express.Router();
const Data = require("../models/Data");


// ✅ GET all data with filters
router.get("/", async (req, res) => {
  try {
    const {
      country,
      topic,
      region,
      sector,
      pestle,
      source,
      end_year
    } = req.query;

    const filters = {};

    if (country) filters.country = country;
    if (topic) filters.topic = topic;
    if (region) filters.region = region;
    if (sector) filters.sector = sector;
    if (pestle) filters.pestle = pestle;
    if (source) filters.source = source;
    if (end_year) filters.end_year = Number(end_year);

   const data = await Data.find().limit(2000);

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


// ✅ GET unique filter values
router.get("/filters", async (req, res) => {
  try {
    const countries = await Data.distinct("country");
    const topics = await Data.distinct("topic");
    const regions = await Data.distinct("region");
    const sectors = await Data.distinct("sector");
    const pestles = await Data.distinct("pestle");
    const sources = await Data.distinct("source");

    res.json({
      countries,
      topics,
      regions,
      sectors,
      pestles,
      sources
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;