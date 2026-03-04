import { useAnkiDeck } from '../hooks/useAnkiDeck'

export default function AnkiDeck() {
    const { deck, deckCount, removeCard, clearDeck, exportDeck } = useAnkiDeck()

    const handleClear = () => {
        if (window.confirm('¿Estás seguro de que quieres vaciar todo el mazo? Esta acción no se puede deshacer.')) {
            clearDeck()
        }
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-1">Mazo de repaso</h2>
                <p className="text-sm text-gray-400">
                    {deckCount === 0
                        ? 'No tienes tarjetas guardadas'
                        : `${deckCount} tarjeta${deckCount === 1 ? '' : 's'} en tu mazo`}
                </p>
            </div>

            {deckCount === 0 ? (
                <div className="text-center py-16 px-6 rounded-xl border border-gray-800 bg-gray-900/30">
                    <p className="text-gray-300 mb-3 font-medium">Tu mazo está vacío</p>
                    <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
                        Cuando termines un examen, revisa tus resultados y usa el botón
                        "Guardar para Anki" en las preguntas que quieras repasar. Luego
                        vuelve aquí para descargar tu mazo e importarlo en Anki.
                    </p>
                </div>
            ) : (
                <>
                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 mb-6">
                        <button
                            onClick={exportDeck}
                            className="px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm transition-colors"
                        >
                            Descargar para Anki (.txt)
                        </button>
                        <button
                            onClick={handleClear}
                            className="px-5 py-2.5 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 font-medium text-sm transition-colors"
                        >
                            Vaciar mazo
                        </button>
                    </div>

                    {/* Card list */}
                    <div className="space-y-2">
                        {deck.map((card) => (
                            <div
                                key={card.id}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-800 bg-gray-900/50"
                            >
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-200 truncate">
                                        {card.front.length > 80
                                            ? card.front.slice(0, 80) + '...'
                                            : card.front}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        {card.tags.split(' ').slice(0, 2).join(' · ')}
                                    </p>
                                </div>
                                <button
                                    onClick={() => removeCard(card.id)}
                                    className="text-gray-500 hover:text-red-400 transition-colors text-sm shrink-0 px-2 py-1"
                                    title="Eliminar tarjeta"
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Browser warning */}
            <p className="mt-8 text-xs text-gray-600 text-center">
                Tus tarjetas se guardan solo en este navegador.
            </p>
        </div>
    )
}
