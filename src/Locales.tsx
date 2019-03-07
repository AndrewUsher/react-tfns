import React, { useEffect, useState } from 'react'

function useLocale() {
  const [state, setState] = useState({ locales: null })
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setState({
        locales: navigator.languages || navigator.language
      })
    }
  }, [])
  return state
}

const Locales = ({ children, render }) => {
  const { locales } = useLocale()
  if (render) {
    return render({ locales })
  } else if (children) {
    return children({ locales })
  } else {
    return null
  }
}

export default Locales
