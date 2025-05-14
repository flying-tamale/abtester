export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { creativeA, creativeB } = req.body;

  const prompt = `
Compare these two ad creatives from a marketing performance perspective.
- Highlight message differences, tone, and CTA variance.
- Indicate whether the differences are likely to drive meaningful performance divergence.
- Give a Confidence Score (Low, Medium, High) on expected difference in user response.

Creative A:
${creativeA}

Creative B:
${creativeB}
`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  const data = await response.json();
  res.status(200).json({ result: data.choices[0].message.content });
}
