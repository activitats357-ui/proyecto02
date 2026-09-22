import { useEffect } from 'react'

/**
 * SEO básico por página: title + meta description, sin dependencias
 * externas (sin react-helmet) para mantener el proyecto ligero.
 */
export default function Seo({ title, description }) {
  useEffect(() => {
    if (title) document.title = title

    if (description) {
      let etiqueta = document.querySelector('meta[name="description"]')
      if (!etiqueta) {
        etiqueta = document.createElement('meta')
        etiqueta.setAttribute('name', 'description')
        document.head.appendChild(etiqueta)
      }
      etiqueta.setAttribute('content', description)
    }
  }, [title, description])

  return null
}
