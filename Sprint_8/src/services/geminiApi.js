/* global process */
const GEMINI_API_KEY = ((typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) || (typeof process !== 'undefined' && process.env && process.env.VITE_GEMINI_API_KEY) || '').trim();
const GEMINI_MODEL = 'gemini-3.1-flash-lite';

const GEMINI_BASE_URL =
  `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export class GeminiConfigError extends Error {
  constructor(message) {
    super(message);
    this.name = 'GeminiConfigError';
  }
}

export class GeminiApiError extends Error {
  constructor(message) {
    super(message);
    this.name = 'GeminiApiError';
  }
}

const ALLOWED_GENRES = [
  'Action',
  'Adventure',
  'Animation',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Family',
  'Fantasy',
  'History',
  'Horror',
  'Music',
  'Mystery',
  'Romance',
  'Science Fiction',
  'Thriller',
  'War',
  'Western',
];

const moodMap = {
  sad: 'Drama',
  happy: 'Comedy',
  motivational: 'Drama',
  motivation: 'Drama',
  romantic: 'Romance',
  thriller: 'Thriller',
  horror: 'Horror',
  comedy: 'Comedy',
  action: 'Action',
  superhero: 'Action',
  scifi: 'Science Fiction',
  'mind blowing': 'Mystery',
  emotional: 'Drama',
  nostalgic: 'Family',
  adventure: 'Adventure',
  scary: 'Horror',
  funny: 'Comedy',
};

function buildPrompt(mood) {
  return `
You are an expert movie genre classifier.

The user will describe a mood.

Your job is to return ONLY ONE movie genre or keyword that best represents the mood.

Rules:

- Return ONLY ONE word or one TMDB-compatible genre.
- No explanation.
- No punctuation.
- No markdown.
- No JSON.

Possible outputs include:

Action
Adventure
Animation
Comedy
Crime
Documentary
Drama
Family
Fantasy
History
Horror
Music
Mystery
Romance
Science Fiction
Thriller
War
Western

Examples:

Happy -> Comedy
Sad -> Drama
Motivational -> Drama
Mind Blowing -> Mystery
Romantic -> Romance
Scary -> Horror
Funny -> Comedy
Sci-Fi -> Science Fiction
Adventure -> Adventure
Action -> Action

Mood:

${mood}
`.trim();
}

export function sanitizeMovieTitle(rawText) {
  if (!rawText || typeof rawText !== 'string') {
    return '';
  }

  let title = rawText.trim();

  title = title.split('\n')[0].trim();
  title = title.replace(/[*_`#]+/g, '');
  title = title.replace(
    /^(title|movie|answer|recommendation|genre)\s*[:-]\s*/i,
    ''
  );
  title = title.replace(/^["'“”‘’]+|["'“”‘’]+$/g, '');
  title = title.replace(/\s+/g, ' ').trim();

  return title;
}

export async function getMovieRecommendationFromMood(mood, signal) {
  const trimmedMood = String(mood || '').trim();

  if (!trimmedMood) {
    throw new GeminiApiError('Please enter a mood before searching.');
  }

  const normalized = trimmedMood.toLowerCase();

  if (moodMap[normalized]) {
    return moodMap[normalized];
  }

  if (!GEMINI_API_KEY) {
    return 'Drama';
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(new Error('timeout')), 12000);

  const abortListener = () => controller.abort(signal?.reason);
  if (signal) {
    if (signal.aborted) {
      clearTimeout(timeoutId);
      throw new DOMException('Aborted', 'AbortError');
    }
    signal.addEventListener('abort', abortListener);
  }

  let response;
  try {
    response = await fetch(
      `${GEMINI_BASE_URL}?key=${encodeURIComponent(GEMINI_API_KEY)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: buildPrompt(trimmedMood),
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 16,
          },
        }),
      }
    );
    clearTimeout(timeoutId);
  } catch {
    clearTimeout(timeoutId);
    if (signal) {
      signal.removeEventListener('abort', abortListener);
    }
    return 'Drama';
  } finally {
    if (signal) {
      signal.removeEventListener('abort', abortListener);
    }
  }

  if (!response.ok) {
    return 'Drama';
  }

  let data;
  try {
    data = await response.json();
  } catch {
    return 'Drama';
  }

  const rawText =
    data?.candidates?.[0]?.content?.parts
      ?.map((part) => part?.text || '')
      .join(' ')
      .trim() || '';

  const cleaned = sanitizeMovieTitle(rawText);

  const matched = ALLOWED_GENRES.find(
    (g) => g.toLowerCase() === cleaned.toLowerCase() || cleaned.toLowerCase().includes(g.toLowerCase())
  );

  if (!matched) {
    return 'Drama';
  }

  return matched;
}