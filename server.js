app.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/OpenAssistant/oasst-sft-guanaco-7b",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: messages[0].content })
      }
    );

    const data = await response.json();
    const text = data?.generated_text || data?.[0]?.generated_text || "";
    res.json([{ generated_text: text }]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});
