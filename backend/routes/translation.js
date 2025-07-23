const express = require('express');
const router = express.Router();
const { Translate } = require('@google-cloud/translate').v2;

// Instantiates a client
const translate = new Translate();

router.post('/', async (req, res) => {
  const { text, targetLanguage } = req.body;

  if (!text || !targetLanguage) {
    return res.status(400).json({ message: 'Text and targetLanguage are required.' });
  }

  try {
    let [translations] = await translate.translate(text, targetLanguage);
    translations = Array.isArray(translations) ? translations : [translations];
    res.json({ translatedText: translations[0] });
  } catch (error) {
    console.error('ERROR:', error);
    res.status(500).json({ message: 'Translation failed.', error: error.message });
  }
});

module.exports = router;
