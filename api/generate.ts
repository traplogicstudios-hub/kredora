import type { VercelRequest, VercelResponse } from '@vercel/node'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent`

const ALLOWED_METHODS = ['POST']
const MAX_PROMPT_LENGTH = 4000

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!ALLOWED_METHODS.includes(req.method ?? '')) {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'AI service not configured' })
  }

  const { prompt } = req.body ?? {}

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid prompt' })
  }

  if (prompt.length > MAX_PROMPT_LENGTH) {
    return res.status(400).json({ error: 'Prompt exceeds maximum length' })
  }

  try {
    const geminiRes = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1200,
          topP: 0.9,
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        ],
      }),
    })

    if (!geminiRes.ok) {
      const errorBody = await geminiRes.text()
      console.error('Gemini API error:', geminiRes.status, errorBody)
      return res.status(502).json({ error: 'AI service returned an error' })
    }

    const data = await geminiRes.json()
    const text: string = data.candidates?.[0]?.content?.parts?.[0]?.text ?? ''

    return res.status(200).json({ text })
  } catch (err) {
    console.error('generate handler error:', err)
    return res.status(500).json({ error: 'Internal generation error' })
  }
}
