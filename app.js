const express = require('express');
const bodyParser = require('body-parser');
const translate = require('translate-google');
const app = express();
const port = 3000; 

app.use(bodyParser.json());

app.post('/translate', (req, res) => {
  
  if (!req.is('application/json')) {
    return res.status(400).json({ error: "Invalid request format. Use JSON data." });
  }

  // Check if the 'text' key is present in the JSON data
  if (!req.body.text) {
    return res.status(400).json({ error: "Missing 'text' key in the request body." });
  }

  try {
    // Get the English text from the request
    const englishText = req.body.text;

    // Translate the English text to French
    translate(englishText, { to: 'fr' }).then(frenchTranslation => {
      // Return the translated text in the response
      res.json({ translation: frenchTranslation });
    }).catch(error => {
      res.status(500).json({ error: `Translation error: ${error.message}` });
    });
  } catch (error) {
    res.status(500).json({ error: `Unexpected error: ${error.message}` });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
