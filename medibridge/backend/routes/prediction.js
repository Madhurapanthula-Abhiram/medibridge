const express = require('express');
const { callOpenRouter } = require('../utils/ai');
const router = express.Router();

const SYSTEM_PROMPT = `You are an advanced medical assistant AI. 
Analyze symptoms and provide guidance. Never provide definitive diagnosis. 
Suggest OTC medications and recommend specialists.
Always return structured JSON. Do not include any text before or after the JSON block.

REQUIRED JSON FORMAT:
{
  "illnesses": [
    {
      "name": "Illness Name",
      "confidence": "90%",
      "severity": "mild/moderate/severe",
      "description": "Short description"
    }
  ],
  "medications": ["OTC Drug 1", "OTC Drug 2"],
  "home_remedies": ["Remedy 1"],
  "precautions": ["Precaution 1"],
  "emergency_signs": ["Sign 1"],
  "doctor_specialist": "Dermatologist/Neurologist/etc",
  "when_to_consult": "Consult if symptoms persist...",
  "disclaimer": "This information is for educational purposes only..."
}`;

router.post('/', async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms) {
      return res.status(400).json({ message: 'Please provide symptoms' });
    }

    const userPrompt = `Analyze the following symptoms and provide medical guidance: ${Array.isArray(symptoms) ? symptoms.join(', ') : symptoms}`;

    // We send just the prompt here, the utility handles the system prompt
    const result = await callOpenRouter(userPrompt, SYSTEM_PROMPT);

    let prediction;
    try {
      const content = result.content;
      if (typeof content === 'object') {
        prediction = content;
      } else {
        // Robust JSON extraction from AI response
        const start = content.indexOf('{');
        const end = content.lastIndexOf('}');
        if (start !== -1 && end !== -1) {
          const jsonStr = content.substring(start, end + 1);
          prediction = JSON.parse(jsonStr);
        } else {
          throw new Error('No JSON object found in AI response');
        }
      }
    } catch (e) {
      console.error("JSON Parse Error:", e, result.content);
      const errorLog = `[${new Date().toISOString()}] JSON_PARSE_ERROR: ${e.message}\nContent: ${result.content}\n`;
      fs.appendFileSync(path.join(__dirname, '../api.log'), errorLog);
      return res.status(500).json({ message: "Failed to parse AI response as JSON" });
    }

    res.json({
      ...prediction,
      modelUsed: result.model,
      reasoning_details: result.reasoning_details,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ message: 'Server error during prediction', error: error.message });
  }
});

module.exports = router;
