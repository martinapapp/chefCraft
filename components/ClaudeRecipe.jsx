import React from "react"
import ReactMarkdown from "react-markdown"

const ClaudeRecipe = React.forwardRef(function ClaudeRecipe(props, ref) {
    return (
        <section ref={ref} className="suggested-recipe-container" aria-live="polite">
            <h2>Chef Craft Recommends:</h2>
            <ReactMarkdown>{props.recipe}</ReactMarkdown>
        </section>
    )
})

export default ClaudeRecipe