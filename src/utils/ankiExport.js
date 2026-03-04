import allQuestions from '../data/questions.json'

/**
 * Converts a question object (potentially with shuffled options) into
 * an Anki flashcard by looking up the original question from questions.json.
 */
export function questionToFlashcard(question) {
    const original = allQuestions.find((q) => q.id === question.id)

    if (!original) {
        return null
    }

    return {
        id: original.id,
        front: original.question,
        back: `${original.options[original.answer]}\n\n${original.explanation}`,
        tags: `${original.area} ${original.subarea} ${original.topic}`,
        added_at: new Date().toISOString(),
    }
}

/**
 * Generates an Anki-importable TSV string from a deck of flashcards.
 * Includes Anki header directives for automatic configuration.
 */
export function exportDeckToAnkiTSV(deck) {
    const header = '#separator:tab\n#html:true\n#tags column:3\n'
    const rows = deck.map((card) => {
        const front = card.front.replace(/\n/g, '<br>')
        const back = card.back.replace(/\n/g, '<br>')
        return `${front}\t${back}\t${card.tags}`
    })
    return header + rows.join('\n')
}

/**
 * Creates a Blob from content and triggers a file download.
 */
export function downloadFile(content, filename) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}
