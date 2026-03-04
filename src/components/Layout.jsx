export default function Layout({ children, onNavigateHome, onNavigateTerms, onNavigateRepaso, ankiDeckCount }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className="text-lg font-bold text-white tracking-tight hover:opacity-80 transition-opacity"
            title="Volver al inicio"
          >
            <span className="text-blue-400">Ceneval</span>Prep
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateRepaso}
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Repaso
              {ankiDeckCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-medium">
                  {ankiDeckCount}
                </span>
              )}
            </button>
            <span className="text-xs text-gray-500">Acuerdo 286</span>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-gray-800/60 bg-gray-950 mt-12">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <button
                onClick={onNavigateHome}
                className="text-sm font-bold text-gray-300 hover:opacity-80 transition-opacity tracking-wide"
              >
                <span className="text-blue-400">Ceneval</span>Prep
              </button>
              <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1.5 justify-center md:justify-start">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 inline-block"></span>
                Simuladores de admisión
              </p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-sm font-medium">
              <button
                onClick={onNavigateTerms}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Términos y condiciones
              </button>

              {/* Enlaces a redes sociales */}
              <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
                <span>Facebook</span>
              </a>

              <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
                <span>X / Twitter</span>
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-800/40 flex flex-col items-center gap-2">
            <p className="text-sm text-gray-500">
              Hecho con ♥ por <a href="https://github.com/cortsito" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white hover:underline transition-colors font-medium">cortsito</a>
            </p>
            <p className="text-xs text-gray-600">
              © {new Date().getFullYear()} Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
