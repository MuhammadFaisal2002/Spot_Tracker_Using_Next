export async function POST(req: Request) {
    const { message } = await req.json();
  
    const response = await fetch("https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: `<|system|>You are a helpful assistant.<|user|>${message}<|assistant|>`,
        parameters: {
          return_full_text: false, // 💡 Only get the reply
        }
      }),
    });
  
    const data = await response.json();
  
    const reply = data?.[0]?.generated_text?.trim() || "Sorry, I could not respond.";
    return Response.json({ reply });
  }
  