import { useState } from 'react'

const CATEGORIES = [
    { value: 'correccion', label: '🔧 Corrección de pregunta', placeholder: 'Describe qué pregunta tiene error y cuál sería la corrección...' },
    { value: 'sugerencia', label: '💡 Sugerencia de mejora', placeholder: 'Comparte tu idea para mejorar la plataforma...' },
    { value: 'contenido', label: '📚 Solicitud de contenido', placeholder: 'Qué área, tema o tipo de pregunta te gustaría ver...' },
    { value: 'otro', label: '💬 Otro', placeholder: 'Cuéntanos lo que piensas...' },
]

const EMAIL = 'lcort05@outlook.com'

export default function Suggestions({ onBack }) {
    const [category, setCategory] = useState(CATEGORIES[0].value)
    const [message, setMessage] = useState('')
    const [questionId, setQuestionId] = useState('')
    const [sent, setSent] = useState(false)

    const selectedCategory = CATEGORIES.find(c => c.value === category)

    const handleSubmit = (e) => {
        e.preventDefault()

        const subjectMap = {
            correccion: `[Corrección] Pregunta ${questionId || 'sin ID'}`,
            sugerencia: '[Sugerencia] Mejora de plataforma',
            contenido: '[Contenido] Solicitud de nuevo contenido',
            otro: '[CenevalPrep] Comentario general',
        }

        const subject = encodeURIComponent(subjectMap[category])
        const body = encodeURIComponent(
            `Categoría: ${selectedCategory.label}\n` +
            (questionId ? `ID de pregunta: ${questionId}\n` : '') +
            `\n${message}\n\n---\nEnviado desde CenevalPrep`
        )

        window.open(`mailto:${EMAIL}?subject=${subject}&body=${body}`, '_self')
        setSent(true)
    }

    if (sent) {
        return (
            <div className="max-w-lg mx-auto px-4 py-16 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-3xl">
                    ✉️
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">¡Gracias por tu mensaje!</h2>
                <p className="text-gray-400 mb-2">
                    Se debió abrir tu aplicación de correo con el mensaje listo para enviar.
                </p>
                <p className="text-gray-500 text-sm mb-8">
                    Si no se abrió, puedes escribirnos directamente a{' '}
                    <a href={`mailto:${EMAIL}`} className="text-blue-400 hover:underline">{EMAIL}</a>
                </p>
                <div className="flex gap-3 justify-center">
                    <button
                        onClick={() => { setSent(false); setMessage(''); setQuestionId(''); }}
                        className="px-5 py-2.5 rounded-xl border border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white text-sm transition-colors"
                    >
                        Enviar otra
                    </button>
                    <button
                        onClick={onBack}
                        className="px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors"
                    >
                        Volver al inicio
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-lg mx-auto px-4 py-8">
            <button
                onClick={onBack}
                className="text-sm text-gray-400 hover:text-white mb-6 flex items-center gap-1 transition-colors"
            >
                ← Volver al inicio
            </button>

            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Buzón de sugerencias</h2>
                <p className="text-gray-400 text-sm">
                    ¿Encontraste un error en una pregunta? ¿Tienes una idea para mejorar la plataforma?
                    Tu retroalimentación nos ayuda a crecer.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Categoría */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Tipo de mensaje</label>
                    <div className="grid grid-cols-2 gap-2">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.value}
                                type="button"
                                onClick={() => setCategory(cat.value)}
                                className={`text-left px-3 py-2.5 rounded-lg border text-sm transition-all ${category === cat.value
                                    ? 'border-blue-500 bg-blue-500/10 text-white'
                                    : 'border-gray-800 bg-gray-900 text-gray-400 hover:border-gray-700'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ID de pregunta (solo para correcciones) */}
                {category === 'correccion' && (
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            ID de la pregunta <span className="text-gray-500 font-normal">(opcional, ej: mat-042)</span>
                        </label>
                        <input
                            type="text"
                            value={questionId}
                            onChange={(e) => setQuestionId(e.target.value)}
                            placeholder="mat-001"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-700 bg-gray-800/50 text-gray-200 text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-colors"
                        />
                    </div>
                )}

                {/* Mensaje */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Tu mensaje</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={selectedCategory.placeholder}
                        rows={5}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800/50 text-gray-200 text-sm placeholder-gray-600 resize-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-colors"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={!message.trim()}
                    className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Enviar sugerencia
                </button>

                <p className="text-xs text-gray-600 text-center">
                    Se abrirá tu aplicación de correo con el mensaje listo para enviar.
                </p>
            </form>
        </div>
    )
}
