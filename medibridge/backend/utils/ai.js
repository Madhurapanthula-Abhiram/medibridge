const axios = require('axios');

async function callOpenRouter(messages, systemPrompt = null) {
    const models = [
        'nvidia/nemotron-3-nano-30b-a3b:free',
        'openai/gpt-oss-20b:free',
        'arcee-ai/trinity-mini:free'
    ];

    let lastError = null;

    // If messages is just a string (old format), convert to messages array
    let currentMessages = typeof messages === 'string'
        ? [{ role: 'user', content: messages }]
        : messages;

    if (systemPrompt && !currentMessages.some(m => m.role === 'system')) {
        currentMessages = [{ role: 'system', content: systemPrompt }, ...currentMessages];
    }

    for (const model of models) {
        try {
            console.log(`Attempting with model: ${model}`);
            const response = await axios.post(
                'https://openrouter.ai/api/v1/chat/completions',
                {
                    model: model,
                    messages: currentMessages,
                    temperature: 0.3,
                    max_tokens: 500,
                    top_p: 0.9,
                    reasoning: { enabled: true }
                },
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                        'Content-Type': 'application/json',
                        'HTTP-Referer': 'https://medibridge.com',
                        'X-Title': 'MediBridge Health'
                    },
                    timeout: 15000
                }
            );

            if (response.data && response.data.choices && response.data.choices[0].message) {
                const msg = response.data.choices[0].message;
                return {
                    content: msg.content,
                    reasoning_details: msg.reasoning_details || null,
                    model: model
                };
            }
        } catch (error) {
            console.error(`Error with model ${model}:`, error.response?.data || error.message);
            lastError = error;
        }
    }

    throw lastError || new Error('All models failed');
}

module.exports = { callOpenRouter };
