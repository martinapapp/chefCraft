import express from "express"
import fetch from "node-fetch"
import cors from "cors"
import "dotenv/config"
import path from "path"

const app = express()
app.use(cors())
app.use(express.json())

app.post("/api/recipe", async (req, res) => {
    console.log("Token:", process.env.HF_ACCESS_TOKEN ? "✅ found" : "❌ missing")
    const { ingredients } = req.body
    try {
        const response = await fetch(
        "https://router.huggingface.co/v1/chat/completions",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.HF_ACCESS_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "meta-llama/Llama-3.1-8B-Instruct:cerebras",
                messages: [
                    { role: "system", content: "You are an assistant that receives a list of ingredients and suggests a recipe. Format your response in markdown." },
                    { role: "user", content: `I have ${ingredients}. Please give me a recipe!` },
                ],
                max_tokens: 1024,
            }),
        }
    )
        const data = await response.json()
        console.log("HF response:", JSON.stringify(data)) 
        res.json({ recipe: data.choices[0].message.content })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.use(express.static(path.join(process.cwd(), "dist")))

app.listen(3001, () => console.log("Server running on port 3001"))