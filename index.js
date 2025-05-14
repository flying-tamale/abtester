import { useState } from 'react';

export default function Home() {
  const [creativeA, setCreativeA] = useState('');
  const [creativeB, setCreativeB] = useState('');
  const [result, setResult] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setResult('Analyzing...');
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ creativeA, creativeB }),
    });
    const data = await res.json();
    setResult(data.result);
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h1>A/B Creative Checker</h1>
      <form onSubmit={handleSubmit}>
        <textarea value={creativeA} onChange={e => setCreativeA(e.target.value)} placeholder="Creative A" rows={6} style={{ width: '100%', marginBottom: 10 }} />
        <textarea value={creativeB} onChange={e => setCreativeB(e.target.value)} placeholder="Creative B" rows={6} style={{ width: '100%', marginBottom: 10 }} />
        <button type="submit">Analyze</button>
      </form>
      {result && <pre style={{ whiteSpace: 'pre-wrap', marginTop: 20 }}>{result}</pre>}
    </div>
  );
}
