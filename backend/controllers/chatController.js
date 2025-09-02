import openai from "../config/openai.js";

// AI Chatbot Controller
export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",  // lightweight, fast model
      messages: [
        {
          role: "system",
          content:
            "You are a helpful pregnancy assistant. Provide friendly, safe, and simple guidance. If symptoms are dangerous, advise the user to see a doctor immediately.",
        },
        { role: "user", content: message },
      ],
      max_tokens: 200,
    });

    const reply = response.choices[0].message.content;

    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "AI service error" });
  }
};
