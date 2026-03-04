import React from 'react'

export default function Terms({ onBack }) {
    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <button
                onClick={onBack}
                className="text-sm text-gray-400 hover:text-white mb-6 flex items-center gap-1 transition-colors"
            >
                ← Volver al inicio
            </button>

            <div className="prose prose-invert max-w-none">
                <h2 className="text-3xl font-bold mb-6 text-white">Términos y Condiciones</h2>

                <div className="space-y-6 text-gray-300 leading-relaxed text-sm md:text-base">
                    <section>
                        <h3 className="text-xl font-semibold mb-3 text-white">1. Aceptación de los Términos</h3>
                        <p>
                            Al acceder y utilizar esta plataforma de simulación (en adelante, "la Plataforma"),
                            aceptas estar sujeto a estos Términos y Condiciones. Si no estás de acuerdo con alguna
                            parte de estos términos, te sugerimos no utilizar nuestro servicio.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-xl font-semibold mb-3 text-white">2. Naturaleza del Servicio y Exclusión de Responsabilidad</h3>
                        <p>
                            Esta Plataforma es una herramienta de estudio independiente, gratuita y de práctica.
                            <strong> NO estamos afiliados, asociados, autorizados ni respaldados oficialmente por Ceneval, A.C.</strong>,
                            la UNAM, el IPN ni ninguna otra institución educativa gubernamental o privada.
                            Los nombres, marcas y logos mencionados (como "Ceneval", "Acuerdo 286", "UNAM", "IPN")
                            son propiedad de sus respectivos dueños y se usan aquí únicamente con fines de referencia descriptiva.
                        </p>
                        <p className="mt-2">
                            El uso de esta Plataforma no garantiza la aprobación de ningún examen oficial. El contenido
                            se proporciona "tal cual", basado en temarios públicos, sin garantías de exactitud perfecta o similitud
                            idéntica con las pruebas reales.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-xl font-semibold mb-3 text-white">3. Futuras Funcionalidades (Cuentas y Estadísticas)</h3>
                        <p>
                            Actualmente, la Plataforma opera sin registro de usuarios. Sin embargo, en un futuro se implementarán
                            sistemas de <strong>creación de cuentas, inicio de sesión y perfiles de usuario</strong>.
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>
                                <strong>Estadísticas y Gamificación:</strong> Recopilaremos y almacenaremos tu historial de resultados,
                                tiempo de respuesta y métricas de desempeño para ofrecerte estadísticas personalizadas tipo juego
                                (progresión, logros, áreas de mejora).
                            </li>
                            <li>
                                <strong>Privacidad de Datos:</strong> Cuando se implementen las cuentas, tu correo y contraseña
                                serán almacenados con protocolos de seguridad estándar. Tus estadísticas de estudio serán privadas y
                                no se venderán a terceros para fines de marketing.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-xl font-semibold mb-3 text-white">4. Expansión a Otros Exámenes (UNAM, IPN, etc.)</h3>
                        <p>
                            La Plataforma tiene planes de expansión para incluir simuladores y material de preparación para
                            exámenes de admisión a la Educación Superior, como el examen de la <strong>UNAM</strong> y el <strong>IPN</strong>.
                            Todos los presentes lineamientos generales, limitaciones de responsabilidad y reglas de uso aplicarán
                            por igual a estas futuras secciones y simuladores.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-xl font-semibold mb-3 text-white">5. Uso Aceptable e Integridad de la Plataforma</h3>
                        <p>
                            Te comprometes a utilizar la Plataforma exclusivamente para fines personales de estudio.
                            Queda estrictamente prohibido:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>El uso de bots, scrapers o herramientas automatizadas para extraer de forma masiva el banco de preguntas.</li>
                            <li>Intentar vulnerar la seguridad de la Plataforma o interrumpir su funcionamiento comercial.</li>
                            <li>Comercializar, vender o re-distribuir el contenido generado por esta Plataforma.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-xl font-semibold mb-3 text-white">6. Modificaciones a los Términos</h3>
                        <p>
                            Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento,
                            especialmente cuando se liberen las nuevas funciones de inicio de sesión o nuevos exámenes.
                            El uso continuo de la Plataforma tras cualquier cambio constituye la aceptación de los nuevos términos.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}
