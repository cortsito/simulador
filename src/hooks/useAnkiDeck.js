import { useState, useEffect, useCallback, useSyncExternalStore } from 'react'
import { questionToFlashcard, exportDeckToAnkiTSV, downloadFile } from '../utils/ankiExport'

const STORAGE_KEY = 'cenevalprep_anki_deck'

// Module-level shared store so all hook instances share state
let currentDeck = loadFromStorage()
const listeners = new Set()

function loadFromStorage() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            const parsed = JSON.parse(stored)
            if (Array.isArray(parsed)) {
                return parsed
            }
        }
    } catch {
        // Corrupted data — start fresh
    }
    return []
}

function persist(deck) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(deck))
    } catch {
        // Storage full or unavailable — silent fail
    }
}

function setDeck(nextDeck) {
    currentDeck = typeof nextDeck === 'function' ? nextDeck(currentDeck) : nextDeck
    persist(currentDeck)
    listeners.forEach((fn) => fn())
}

function subscribe(listener) {
    listeners.add(listener)
    return () => listeners.delete(listener)
}

function getSnapshot() {
    return currentDeck
}

export function useAnkiDeck() {
    const deck = useSyncExternalStore(subscribe, getSnapshot)

    const addCard = useCallback(
        (question) => {
            const exists = deck.some((card) => card.id === question.id)
            if (exists) {
                return { added: false, alreadyExists: true }
            }

            const flashcard = questionToFlashcard(question)
            if (!flashcard) {
                return { added: false, alreadyExists: false }
            }

            setDeck((prev) => [...prev, flashcard])
            return { added: true, alreadyExists: false }
        },
        [deck]
    )

    const removeCard = useCallback((id) => {
        setDeck((prev) => prev.filter((card) => card.id !== id))
    }, [])

    const clearDeck = useCallback(() => {
        setDeck([])
    }, [])

    const exportDeck = useCallback(() => {
        if (deck.length === 0) return
        const content = exportDeckToAnkiTSV(deck)
        downloadFile(content, 'cenevalprep-repaso.txt')
    }, [deck])

    return {
        deck,
        deckCount: deck.length,
        addCard,
        removeCard,
        clearDeck,
        exportDeck,
    }
}
