const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");


// ✅ GET /api/leads → fetch all leads
router.get("/", async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ POST /api/leads → create new lead
router.post("/", async (req, res) => {
  try {
    const newLead = new Lead(req.body);
    const savedLead = await newLead.save();
    res.status(201).json(savedLead);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// ✅ PATCH /api/leads/:id → update status
router.patch("/:id", async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // ✅ FIXED
    );
    res.json(updatedLead);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;