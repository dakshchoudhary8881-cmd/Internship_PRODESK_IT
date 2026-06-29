const _responseCache = new Map();
const MIN_CALL_GAP = 4000;
let _lastCallTimestamp = 0;
let _lastTemplateIndex = -1;

const GEMINI_MODELS = [
    'gemini-2.0-flash-lite',
    'gemini-2.0-flash',
    'gemini-1.5-flash',
    'gemini-1.5-flash-8b'
];

function _getCacheKey(state) {
    return `${state.name}|${state.role}|${state.company}|${state.skills}|${state.tone}|${(state.resumeText || '').substring(0, 200)}`;
}

function _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function _throttle() {
    const now = Date.now();
    const elapsed = now - _lastCallTimestamp;
    if (elapsed < MIN_CALL_GAP) await _sleep(MIN_CALL_GAP - elapsed);
    _lastCallTimestamp = Date.now();
}

function generateFromTemplate(state) {
    const skillsList = state.skills.split(',').map(s => s.trim()).filter(Boolean);
    const primarySkills = skillsList.slice(0, 3).join(', ') || state.skills;
    const additionalSkills = skillsList.slice(3).join(', ');
    const allSkills = skillsList.join(', ') || state.skills;
    const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    _lastTemplateIndex = (_lastTemplateIndex + 1) % 9;

    const templates = [
        `Subject: ${state.role} Application – ${state.name}\n\nHi Hiring Manager at ${state.company},\n\nI’m writing to express my strong interest in the ${state.role} role at ${state.company}.\n\nAs a developer with a solid technical background, I specialize in building complete, high-quality ecosystems—leveraging technologies such as ${primarySkills} to deliver responsive, seamless user experiences.\n\nRecently, I’ve been focused on developing modern applications and responsive interfaces that require clean architecture and dependable data integration. I love taking a project from an initial concept all the way to a polished, user-friendly UI.\n\nI’d love to chat about how my technical versatility in ${allSkills} can help your team ship great products faster. I have attached my resume for your review.\n\nBest regards,\n\n${state.name}`,
        `${currentDate}\n\nDear Hiring Manager at ${state.company},\n\nI am submitting my resume for the ${state.role} position. With hands-on experience bridging core software engineering principles with robust practical execution, I am highly interested in the technical challenges your team is tackling at ${state.company}.\n\nMy technical foundation spans critical engineering domains:\n\n• Core Development: Crafting modern, high-contrast UIs and building scalable application logic using ${primarySkills}.\n• System Integration: Engineering dependable logic bridges and integrating APIs to ensure seamless, low-latency data communication across complex workflows${additionalSkills ? ' utilizing ' + additionalSkills : ''}.\n• Problem Solving: Actively building production-ready features that require strict data management, clean code architecture, and continuous performance optimization.\n\nI thrive in fast-paced environments where I can optimize database structures one day and troubleshoot complex UI workflows the next. I would be thrilled to bring this end-to-end perspective to ${state.company}.\n\nThank you for your time, and I look forward to discussing my technical background with you.\n\nSincerely,\n\n${state.name}`,
        `${currentDate}\n\nDear Hiring Team at ${state.company},\n\nI am applying for the ${state.role} role because I am passionate about building products that solve real problems. I don't just write code; I look at the big picture of user experience, design aesthetics, and overall system architecture.\n\nThrough my engineering work and collaborative projects—leveraging ${allSkills}—I have developed a strong product mindset. I am comfortable handling everything from designing intuitive, premium frontend interfaces to structuring the dependable application logic that keeps platforms running securely.\n\nFurthermore, my versatile technical background allows me to think outside the standard software box. I am a self-starter who is used to researching solutions, debugging complex logic flows, and iterating quickly based on feedback.\n\nI know that driving impact at ${state.company} requires adaptability and a relentless drive to build scalable solutions. I am ready to hit the ground running and contribute directly to your product's growth. Let's build something awesome together.\n\nBest,\n\n${state.name}`,
        `${currentDate}\n\nDear Hiring Manager at ${state.company},\n\nI am writing to apply for the ${state.role} opportunity at ${state.company}. As a dedicated software builder and active technologist, I am eager to bring my drive for innovation to your engineering team.\n\nParticipating in intensive collaborative projects and technical challenges has taught me how to work efficiently under pressure, solve complex architectural themes, and pitch technical solutions clearly. Whether I am developing full-stack web applications or exploring new frameworks, I am constantly pushing myself to master tools like ${primarySkills}.\n\nCurrently, I am proficient in developing complete software solutions utilizing ${allSkills}. I am looking for an opportunity where I can absorb industry best practices while actively contributing high-quality code to production-level projects.\n\nI am highly motivated to learn from and contribute to the talented team at ${state.company} and am confident in my ability to ramp up quickly. Thank you for considering my application.\n\nSincerely,\n\n${state.name}`,
        `${currentDate}\n\nDear Hiring Manager at ${state.company},\n\nPlease accept this letter and the enclosed resume as an expression of my strong interest in the ${state.role} position with ${state.company}. With a comprehensive background leveraging ${primarySkills}, I am confident in my ability to make a meaningful and immediate contribution to your organization.\n\nIn my recent work, I have successfully designed, coded, and deployed comprehensive digital solutions. My technical expertise includes building responsive user interfaces, managing structured data workflows, and developing scalable application logic with ${allSkills}.\n\nAdditionally, my hands-on approach to continuous learning and multi-disciplinary problem-solving provides me with a unique perspective when tackling technical hurdles. I pride myself on writing clean, maintainable code and designing systems that are both scalable and user-centric.\n\nI am drawn to ${state.company} because of your reputation for innovation and commitment to excellence. I welcome the opportunity to discuss how my technical skills and dedication to quality can directly support your team’s objectives.\n\nThank you for your time and consideration.\n\nRespectfully,\n\n${state.name}`,
        `Subject: ${state.role} – ${state.name}\n\nDear Hiring Team at ${state.company},\n\nA truly premium digital experience starts with the underlying structure. I am writing to apply for the ${state.role} position at ${state.company}, bringing a relentless focus on translating modern, high-end designs into interactive reality.\n\nMy expertise lies in crafting the foundational architecture of scalable applications using ${primarySkills}. I don't just write markup; I build interfaces and systems that feel luxurious, responsive, and intuitive to the end-user. By treating application performance as a critical touchpoint for brand identity, I ensure that every workflow and component serves a distinct purpose.\n\n${state.company}’s commitment to quality aligns perfectly with my approach to software engineering. I am confident in my ability to immediately elevate the aesthetic and structural integrity of your platforms utilizing ${allSkills}. I look forward to discussing how my eye for precision in code will deliver results for your team.\n\nBest regards,\n\n${state.name}`,
        `Subject: Driving User Engagement at ${state.company} – ${state.role} Application\n\nDear Hiring Manager,\n\nThe best software engineers understand that code is simply a tool to solve business problems and engage users. I am applying for the ${state.role} role at ${state.company} because I specialize in building user-centric platforms that scale.\n\nHaving architected digital environments and interactive solutions, I know that robust execution is critical to a product's success. My command of ${primarySkills} allows me to structure applications that are inherently accessible, lightning-fast, and built for growth. I write clean, modular code designed to integrate seamlessly with complex workflows, ensuring the user experience never drops a frame.\n\nI am a self-starter who thrives in fast-paced environments where digital products need to be shipped efficiently without compromising on quality. I am ready to bring this product-first mentality and my background in ${allSkills} to ${state.company} and help drive your next phase of development.\n\nSincerely,\n\n${state.name}`,
        `Subject: Application for ${state.role}: ${state.name}\n\nDear Hiring Team at ${state.company},\n\nFrameworks come and go, but the structural integrity of digital platforms relies on flawless code. I am submitting my application for the ${state.role} position at ${state.company} to bring a standard of technical excellence to your codebase.\n\nI am highly confident in my ability to architect robust, semantic, and highly performant applications using ${primarySkills}. My approach ensures that reliability, optimization, and seamless integration are built directly into the system from day one. I view clean code not just as a technical requirement, but as the critical skeleton that supports complex user logic.\n\n${state.company} requires engineering that scales flawlessly. I bring a disciplined, clean-code philosophy utilizing ${allSkills} that minimizes technical debt and maximizes performance metrics. I would welcome the opportunity to review your current architecture and discuss the immediate impact I can make on your development cycle.\n\nBest,\n\n${state.name}`,
        `Subject: ${state.role} – ${state.name}\n\nHi Team ${state.company},\n\nI build fast, premium, and scalable digital applications, and I want to bring my expertise in ${primarySkills} to ${state.company}.\n\nAs a ${state.role}, I specialize in the structural foundation and execution of modern software. My technical command ensures that the applications I build are structurally sound, highly responsive, and ready to handle complex dynamic workflows. I don't just write lines of code; I engineer digital environments utilizing ${allSkills} that perform flawlessly under pressure.\n\nI am looking for a team that moves fast and values exceptional code quality. I am confident that my ability to bridge technical precision with top-tier execution makes me the right fit for your goals.\n\nLet’s connect this week to discuss what we can build together.\n\nBest,\n\n${state.name}`
    ];

    return templates[_lastTemplateIndex];
}

function getTemplateMetadata() {
    return [
        { name: 'Short & Direct', tag: 'Best for Cold Outreach', desc: 'Concise, high-impact structure focused on technical versatility and quick scanning.' },
        { name: 'Core Foundations', tag: 'Engineering Focused', desc: 'Highlights system integration, UI architecture, and dependable problem solving.' },
        { name: 'Product Mindset', tag: 'Startup & Growth', desc: 'Connects software architecture directly to user experience and overall product ROI.' },
        { name: 'Active Builder', tag: 'High Energy & Drive', desc: 'Demonstrates rapid learning, working under pressure, and mastery of modern tools.' },
        { name: 'Executive Standard', tag: 'Formal Corporate', desc: 'Polished expression of multi-disciplinary problem solving and continuous excellence.' },
        { name: 'Design-Forward', tag: 'UI/UX & Luxury', desc: 'Treats frontend aesthetics and semantic HTML as critical brand touchpoints.' },
        { name: 'User Engagement', tag: 'Scalability & Speed', desc: 'Emphasizes lightning-fast performance, accessibility, and modular code architecture.' },
        { name: 'Code Purist', tag: 'Clean Architecture', desc: 'Focuses on minimizing technical debt and maximizing structural reliability.' },
        { name: 'Agile Innovator', tag: 'Fast-Paced Teams', desc: 'Action-oriented format for dynamic teams valuing top-tier execution and speed.' }
    ];
}

function generateTemplateByIndex(index, state) {
    const s = {
        name: state.name?.trim() || 'Alex Morgan',
        role: state.role?.trim() || 'Senior Software Engineer',
        company: state.company?.trim() || 'Optiq Innovation',
        skills: state.skills?.trim() || 'JavaScript, React, Node.js, TypeScript, REST APIs'
    };
    const skillsList = s.skills.split(',').map(x => x.trim()).filter(Boolean);
    const primarySkills = skillsList.slice(0, 3).join(', ') || s.skills;
    const additionalSkills = skillsList.slice(3).join(', ');
    const allSkills = skillsList.join(', ') || s.skills;
    const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const templates = [
        `Subject: ${s.role} Application – ${s.name}\n\nHi Hiring Manager at ${s.company},\n\nI’m writing to express my strong interest in the ${s.role} role at ${s.company}.\n\nAs a developer with a solid technical background, I specialize in building complete, high-quality ecosystems—leveraging technologies such as ${primarySkills} to deliver responsive, seamless user experiences.\n\nRecently, I’ve been focused on developing modern applications and responsive interfaces that require clean architecture and dependable data integration. I love taking a project from an initial concept all the way to a polished, user-friendly UI.\n\nI’d love to chat about how my technical versatility in ${allSkills} can help your team ship great products faster. I have attached my resume for your review.\n\nBest regards,\n\n${s.name}`,
        `${currentDate}\n\nDear Hiring Manager at ${s.company},\n\nI am submitting my resume for the ${s.role} position. With hands-on experience bridging core software engineering principles with robust practical execution, I am highly interested in the technical challenges your team is tackling at ${s.company}.\n\nMy technical foundation spans critical engineering domains:\n\n• Core Development: Crafting modern, high-contrast UIs and building scalable application logic using ${primarySkills}.\n• System Integration: Engineering dependable logic bridges and integrating APIs to ensure seamless, low-latency data communication across complex workflows${additionalSkills ? ' utilizing ' + additionalSkills : ''}.\n• Problem Solving: Actively building production-ready features that require strict data management, clean code architecture, and continuous performance optimization.\n\nI thrive in fast-paced environments where I can optimize database structures one day and troubleshoot complex UI workflows the next. I would be thrilled to bring this end-to-end perspective to ${s.company}.\n\nThank you for your time, and I look forward to discussing my technical background with you.\n\nSincerely,\n\n${s.name}`,
        `${currentDate}\n\nDear Hiring Team at ${s.company},\n\nI am applying for the ${s.role} role because I am passionate about building products that solve real problems. I don't just write code; I look at the big picture of user experience, design aesthetics, and overall system architecture.\n\nThrough my engineering work and collaborative projects—leveraging ${allSkills}—I have developed a strong product mindset. I am comfortable handling everything from designing intuitive, premium frontend interfaces to structuring the dependable application logic that keeps platforms running securely.\n\nFurthermore, my versatile technical background allows me to think outside the standard software box. I am a self-starter who is used to researching solutions, debugging complex logic flows, and iterating quickly based on feedback.\n\nI know that driving impact at ${s.company} requires adaptability and a relentless drive to build scalable solutions. I am ready to hit the ground running and contribute directly to your product's growth. Let's build something awesome together.\n\nBest,\n\n${s.name}`,
        `${currentDate}\n\nDear Hiring Manager at ${s.company},\n\nI am writing to apply for the ${s.role} opportunity at ${s.company}. As a dedicated software builder and active technologist, I am eager to bring my drive for innovation to your engineering team.\n\nParticipating in intensive collaborative projects and technical challenges has taught me how to work efficiently under pressure, solve complex architectural themes, and pitch technical solutions clearly. Whether I am developing full-stack web applications or exploring new frameworks, I am constantly pushing myself to master tools like ${primarySkills}.\n\nCurrently, I am proficient in developing complete software solutions utilizing ${allSkills}. I am looking for an opportunity where I can absorb industry best practices while actively contributing high-quality code to production-level projects.\n\nI am highly motivated to learn from and contribute to the talented team at ${s.company} and am confident in my ability to ramp up quickly. Thank you for considering my application.\n\nSincerely,\n\n${s.name}`,
        `${currentDate}\n\nDear Hiring Manager at ${s.company},\n\nPlease accept this letter and the enclosed resume as an expression of my strong interest in the ${s.role} position with ${s.company}. With a comprehensive background leveraging ${primarySkills}, I am confident in my ability to make a meaningful and immediate contribution to your organization.\n\nIn my recent work, I have successfully designed, coded, and deployed comprehensive digital solutions. My technical expertise includes building responsive user interfaces, managing structured data workflows, and developing scalable application logic with ${allSkills}.\n\nAdditionally, my hands-on approach to continuous learning and multi-disciplinary problem-solving provides me with a unique perspective when tackling technical hurdles. I pride myself on writing clean, maintainable code and designing systems that are both scalable and user-centric.\n\nI am drawn to ${s.company} because of your reputation for innovation and commitment to excellence. I welcome the opportunity to discuss how my technical skills and dedication to quality can directly support your team’s objectives.\n\nThank you for your time and consideration.\n\nRespectfully,\n\n${s.name}`,
        `Subject: ${s.role} – ${s.name}\n\nDear Hiring Team at ${s.company},\n\nA truly premium digital experience starts with the underlying structure. I am writing to apply for the ${s.role} position at ${s.company}, bringing a relentless focus on translating modern, high-end designs into interactive reality.\n\nMy expertise lies in crafting the foundational architecture of scalable applications using ${primarySkills}. I don't just write markup; I build interfaces and systems that feel luxurious, responsive, and intuitive to the end-user. By treating application performance as a critical touchpoint for brand identity, I ensure that every workflow and component serves a distinct purpose.\n\n${s.company}’s commitment to quality aligns perfectly with my approach to software engineering. I am confident in my ability to immediately elevate the aesthetic and structural integrity of your platforms utilizing ${allSkills}. I look forward to discussing how my eye for precision in code will deliver results for your team.\n\nBest regards,\n\n${s.name}`,
        `Subject: Driving User Engagement at ${s.company} – ${s.role} Application\n\nDear Hiring Manager,\n\nThe best software engineers understand that code is simply a tool to solve business problems and engage users. I am applying for the ${s.role} role at ${s.company} because I specialize in building user-centric platforms that scale.\n\nHaving architected digital environments and interactive solutions, I know that robust execution is critical to a product's success. My command of ${primarySkills} allows me to structure applications that are inherently accessible, lightning-fast, and built for growth. I write clean, modular code designed to integrate seamlessly with complex workflows, ensuring the user experience never drops a frame.\n\nI am a self-starter who thrives in fast-paced environments where digital products need to be shipped efficiently without compromising on quality. I am ready to bring this product-first mentality and my background in ${allSkills} to ${s.company} and help drive your next phase of development.\n\nSincerely,\n\n${s.name}`,
        `Subject: Application for ${s.role}: ${s.name}\n\nDear Hiring Team at ${s.company},\n\nFrameworks come and go, but the structural integrity of digital platforms relies on flawless code. I am submitting my application for the ${s.role} position at ${s.company} to bring a standard of technical excellence to your codebase.\n\nI am highly confident in my ability to architect robust, semantic, and highly performant applications using ${primarySkills}. My approach ensures that reliability, optimization, and seamless integration are built directly into the system from day one. I view clean code not just as a technical requirement, but as the critical skeleton that supports complex user logic.\n\n${s.company} requires engineering that scales flawlessly. I bring a disciplined, clean-code philosophy utilizing ${allSkills} that minimizes technical debt and maximizes performance metrics. I would welcome the opportunity to review your current architecture and discuss the immediate impact I can make on your development cycle.\n\nBest,\n\n${s.name}`,
        `Subject: ${s.role} – ${s.name}\n\nHi Team ${s.company},\n\nI build fast, premium, and scalable digital applications, and I want to bring my expertise in ${primarySkills} to ${s.company}.\n\nAs a ${s.role}, I specialize in the structural foundation and execution of modern software. My technical command ensures that the applications I build are structurally sound, highly responsive, and ready to handle complex dynamic workflows. I don't just write lines of code; I engineer digital environments utilizing ${allSkills} that perform flawlessly under pressure.\n\nI am looking for a team that moves fast and values exceptional code quality. I am confident that my ability to bridge technical precision with top-tier execution makes me the right fit for your goals.\n\nLet’s connect this week to discuss what we can build together.\n\nBest,\n\n${s.name}`
    ];
    return templates[index % templates.length];
}

function _buildPrompt(state) {
    const toneInstructions = {
        professional: 'Use a formal, polished, corporate tone.',
        conversational: 'Use a warm, approachable yet professional tone.',
        confident: 'Use a bold, assertive, results-oriented tone.'
    };
    const toneGuide = toneInstructions[state.tone] || toneInstructions.professional;
    let resumeContext = state.resumeText?.trim() ? `\n\nCandidate's resume:\n---\n${state.resumeText.substring(0, 3000)}\n---` : '';

    return `You are an expert cover letter writer.\n\nWrite a cover letter for:\n- Name: ${state.name}\n- Position: ${state.role}\n- Company: ${state.company}\n- Skills: ${state.skills}\n\nTone: ${toneGuide}${resumeContext}\n\nRules:\n1. Write 3-4 paragraphs (plus greeting and sign-off).\n2. Start with today's date, then "Dear Hiring Manager at ${state.company},"\n3. Open with a strong first sentence — no generic openings.\n4. Weave in the candidate's skills naturally with examples.\n5. Reference the company by name.\n6. End with "Sincerely," then the candidate's name.\n7. Output ONLY the cover letter as plain text. No markdown, no notes.`;
}

async function _callGeminiModel(model, prompt, apiKey) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.8, topP: 0.9, maxOutputTokens: 1000 }
        })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const rawMsg = errorData?.error?.message || '';
        const err = new Error(rawMsg);
        err.status = response.status;
        if (response.status === 429 && rawMsg.includes('limit: 0')) err.quotaExhausted = true;
        throw err;
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('Empty response from Gemini.');
    return text.trim();
}

async function generateWithAI(state, apiKey) {
    const cacheKey = _getCacheKey(state);
    if (_responseCache.has(cacheKey)) return _responseCache.get(cacheKey);

    const prompt = _buildPrompt(state);
    await _throttle();
    let lastError = null;

    for (const model of GEMINI_MODELS) {
        for (let attempt = 0; attempt <= 2; attempt++) {
            try {
                const text = await _callGeminiModel(model, prompt, apiKey);
                _responseCache.set(cacheKey, text);
                if (_responseCache.size > 20) _responseCache.delete(_responseCache.keys().next().value);
                return text;
            } catch (error) {
                lastError = error;
                if (error.status === 400 || error.status === 403) {
                    throw new Error(error.status === 400 ? 'Invalid API key.' : 'API key lacks access.');
                }
                if (error.status === 429) {
                    if (error.quotaExhausted) break;
                    const backoffMs = Math.min(2000 * Math.pow(2, attempt), 10000);
                    if (attempt < 2) { await _sleep(backoffMs); continue; }
                    break;
                }
                if (attempt < 2) { await _sleep(1500); continue; }
                break;
            }
        }
    }
    throw new Error('Daily API quota reached. Try again tomorrow or use a new key.');
}

async function generateCoverLetter(state) {
    const apiKey = getStoredApiKey();
    if (apiKey) {
        try {
            const text = await generateWithAI(state, apiKey);
            return { text, mode: 'ai' };
        } catch (error) {
            console.error('[CoverCraft] AI generation failed:', error);
            throw error;
        }
    }

    const delay = Math.floor(Math.random() * 1300) + 3200;
    await _sleep(delay);
    const text = generateFromTemplate(state);
    return { text, mode: 'no-key' };
}

function getStoredApiKey() {
    try { return localStorage.getItem('covercraft_gemini_key') || ''; } catch { return ''; }
}

function setStoredApiKey(key) {
    try {
        if (key) localStorage.setItem('covercraft_gemini_key', key);
        else localStorage.removeItem('covercraft_gemini_key');
    } catch (e) { console.error('Failed to save key:', e); }
}

function clearStoredApiKey() {
    try { localStorage.removeItem('covercraft_gemini_key'); } catch (e) { console.error('Failed to clear key:', e); }
}

function parseMarkdownToHTML(text) {
    return `<p>${text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/\n\n+/g, '</p><p>').replace(/\n/g, '<br>')}</p>`;
}
