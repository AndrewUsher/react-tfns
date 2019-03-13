import React, { useEffect, useState } from 'react'

type LocaleHookTypes = {
  locale: string | undefined
}

type LocaleProps = {
  children?: (props: LocaleHookTypes) => JSX.Element
  render?: (props: LocaleHookTypes) => JSX.Element
}

function useLocale() {
  const [state, setState] = useState({ locale: undefined })
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setState({
        locale: navigator.language
      })
    }
  }, [])
  return state
}

const Locales = ({ children, render }: LocaleProps) => {
  const { locale } = useLocale()
  if (render) {
    return render({ locale })
  } else if (children) {
    return children({ locale })
  } else {
    return undefined
  }
}

export { Locales }
