import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

// Simple in-memory rate limiting map for abuse prevention
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const MAX_REQUESTS_PER_MINUTE = 15;
const RATE_LIMIT_WINDOW = 60 * 1000;

const KNOWLEDGE_BASE_FACTS = `
Kasak Batra is an AI & Data Science Graduate working as a Young Professional in Data Analytics and Remote Audit at the Office of the Comptroller & Auditor General of India (CAG) in New Delhi.
Core headline: "I turn messy data into audit-ready insight."
Credentials:
- 94.5% aggregate in B.Tech (AI & Data Science, Class of 2026) from Dr. Akhilesh Das Gupta Institute of Professional Studies (ADGITM / GGSIPU).
- GATE 2026 Qualified in Artificial Intelligence & Data Science (DA).
- UGC NET Qualified in Computer Science & Applications (eligible for Assistant Professorship).
- CBSE Class XII: 89.0% (2022), Class X: 84.0% (2020).
- Honors: EPAM Scholar (2024-25), NPTEL Elite Top 2% in Business Analytics & Data Mining with R.

Experience:
1. Young Professional @ CAG (Sep 2026 – Present): Remote audit analytics, SQL & Python data pipelines, risk modeling, government dataset audits.
2. Software Faculty @ Delhi Institute of Computer Science (Jul 2026 – Sep 2026): Instructed 150+ students in Python, C++, Java, SQL, Machine Learning, DSA, and DBMS.
3. Data Analytics Intern @ CAG (Jan 2026 – Jul 2026): KNIME workflows for anomaly detection and dedup, REST APIs integrating NREGA & GeM data with AWS S3, evaluated LLMs/VLMs for audit validation.

Key Projects:
- MapMyWork: Geospatial workforce mapping app with GeoPandas, Python, interactive city markers and filtering (GitHub: https://github.com/KASAKBATRA/MapMyWork-Workforce-mapping-with-user-input-).
- CampusHire Analytics: SQL-backed placement management system for candidate credential verification (GitHub: https://github.com/KASAKBATRA/CampusHire_Analytics).
- Audit Analytics & Data Integration: Confidential work at CAG using KNIME, SQL, REST APIs, and AWS S3.
- EmotionsMemoria: Deployed AI web app for memory preservation and emotion wheels (https://emotionsmemoria.netlify.app/).

Authorship & Research:
- Authored Textbook: "Hello AI: A Friendly Introduction to Machine Learning" (Eliva Press, ISBN: 9999331718, available on Amazon India).
- Papers: Nutricaree (IJEDR Journal, Vol. 13 Issue 4), Smart Cities (IJPREMS Journal, Vol. 4 Issue 11), Image-to-Pencil with OpenCV (NCBISF'24).

Contact:
- Email: arorakasak2005@gmail.com
- LinkedIn: https://www.linkedin.com/in/kasak-batra/
- GitHub: https://github.com/KASAKBATRA
- Resume: /Kasak_Resume.pdf
`;

export const handler: Handler = async (event: HandlerEvent, _context: HandlerContext) => {
  // CORS Headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  // Rate Limiting
  const clientIp = event.headers['client-ip'] || event.headers['x-forwarded-for'] || 'client';
  const now = Date.now();
  const rateData = rateLimitMap.get(clientIp) || { count: 0, lastReset: now };

  if (now - rateData.lastReset > RATE_LIMIT_WINDOW) {
    rateData.count = 1;
    rateData.lastReset = now;
  } else {
    rateData.count += 1;
    if (rateData.count > MAX_REQUESTS_PER_MINUTE) {
      return {
        statusCode: 429,
        headers,
        body: JSON.stringify({ error: 'Too many queries. Please pause for a moment.' }),
      };
    }
  }
  rateLimitMap.set(clientIp, rateData);

  let question = '';
  try {
    const payload = JSON.parse(event.body || '{}');
    question = (payload.question || payload.message || '').trim();
  } catch {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid JSON request payload' }),
    };
  }

  // Length limit (max 300 characters)
  if (!question || question.length > 300) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Question must be between 1 and 300 characters' }),
    };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (apiKey) {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-3-5-haiku-20241022',
          max_tokens: 350,
          system: `You are the AI portfolio assistant for Kasak Batra. Answer concisely, warmly, and strictly based on these verified facts. Never invent new facts:\n\n${KNOWLEDGE_BASE_FACTS}`,
          messages: [{ role: 'user', content: question }],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const reply = data.content?.[0]?.text || 'I could not generate a response at this time.';
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ answer: reply }),
        };
      }
    } catch (err) {
      console.error('Claude API call error:', err);
    }
  }

  // Deterministic local grounded fallback when API key is unconfigured
  const qLower = question.toLowerCase();
  let answer = '';

  if (qLower.includes('cag') || qLower.includes('role') || qLower.includes('job') || qLower.includes('work')) {
    answer = "Kasak is currently working as a Young Professional in Data Analytics at the Office of the Comptroller & Auditor General of India (CAG) in New Delhi. She architects remote audit pipelines, develops SQL/Python analytics, and performs risk modeling and record reconciliation across sovereign welfare datasets.";
  } else if (qLower.includes('mapmywork') || qLower.includes('geospatial') || qLower.includes('project')) {
    answer = "MapMyWork is Kasak's interactive geospatial workforce mapping application built with Python and GeoPandas. It visualizes multi-city workforce dispersion with user filtering and clickable cluster markers. You can inspect it on GitHub: github.com/KASAKBATRA/MapMyWork-Workforce-mapping-with-user-input-";
  } else if (qLower.includes('book') || qLower.includes('paper') || qLower.includes('research') || qLower.includes('publish') || qLower.includes('hello ai')) {
    answer = "Kasak has published 3 peer-reviewed papers (covering computational dietetics, smart cities, and OpenCV vision) and authored the book 'Hello AI: A Friendly Introduction to Machine Learning' (Eliva Press, ISBN: 9999331718), available on Amazon India.";
  } else if (qLower.includes('contact') || qLower.includes('email') || qLower.includes('reach') || qLower.includes('hire')) {
    answer = "You can get in touch with Kasak directly via email at arorakasak2005@gmail.com, or connect on LinkedIn (linkedin.com/in/kasak-batra/) and GitHub (github.com/KASAKBATRA).";
  } else if (qLower.includes('gate') || qLower.includes('ugc') || qLower.includes('score') || qLower.includes('marks') || qLower.includes('degree') || qLower.includes('college')) {
    answer = "Kasak achieved a 94.5% aggregate in B.Tech (Artificial Intelligence & Data Science, Class of 2026) from ADGITM (GGSIPU). She has also qualified both GATE 2026 (AI & Data Science) and UGC NET (Computer Science Applications).";
  } else {
    answer = "Kasak Batra is an AI & Data Science graduate working at the CAG on data analytics and remote audit. She holds a 94.5% B.Tech degree, is GATE 2026 and UGC NET qualified, and authored 'Hello AI' (Eliva Press). Feel free to ask about her projects, research, or audit work!";
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ answer }),
  };
};
