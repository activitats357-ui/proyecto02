import { Home } from 'lucide-react'
import Seo from '../components/Seo'
import Button from '../components/Button'
import { centro } from '../data'

export default function NoEncontrado() {
  return (
    <>
      <Seo title={`Página no encontrada | ${centro.nombre}`} description="La página solicitada no existe." />
      <section className="section-padding">
        <div className="container-app flex flex-col items-center gap-4 text-center">
          <span className="text-6xl font-extrabold text-slate-200">404</span>
          <h1 className="text-2xl font-bold text-slate-900">Página no encontrada</h1>
          <p className="max-w-md text-slate-600">
            La página que buscas no existe o ha sido movida.
          </p>
          <Button to="/" icon={Home}>
            Volver al inicio
          </Button>
        </div>
      </section>
    </>
  )
}
