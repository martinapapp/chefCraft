const BASE_URL = import.meta.env.DEV ? "http://localhost:3001" : ""

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    console.log("Fetching from:", `${BASE_URL}/api/recipe`)
    try {
        const res = await fetch(`${BASE_URL}/api/recipe`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ingredients: ingredientsString }),
        })
        const data = await res.json()
        return data.recipe
    } catch (err) {
        console.error("API Error:", err.message)
        return "The AI service is currently unavailable. Please try again later."
    }
}