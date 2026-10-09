/**
 * Vercel Serverless Function to extract words from images using Gemini API
 * The API key is stored securely in Vercel environment variables
 */
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY environment variable not set');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const prompt = `Extract spelling words from this image. Look for a list of spelling words, typically from a school worksheet or word list. Return ONLY a JSON array of objects with this format: [{"word": "example", "sentence": "Use it in a sentence."}]. If you see numbered words with example sentences, extract both. If there are no clear spelling words, return an empty array. Do not include any markdown formatting or explanation, just the raw JSON array.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                {
                  inline_data: {
                    mime_type: 'image/jpeg',
                    data: image,
                  },
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', errorData);
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;

    // Extract JSON from response (in case it's wrapped in markdown)
    let jsonText = text.trim();
    if (jsonText.startsWith('```')) {
      jsonText = jsonText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
    }

    const parsed = JSON.parse(jsonText);

    // Convert to our format
    const words = parsed
      .map((item) => ({
        w: (item.word || item.w || '').toLowerCase().trim(),
        s: item.sentence || item.s || `Example sentence for ${item.word || item.w}.`,
      }))
      .filter((w) => w.w);

    res.status(200).json({ words });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: error.message });
  }
}
