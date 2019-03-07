import React, { useEffect, useState } from 'react'
function useScroll () {
  const [state, setState] = useState({
    x: 0,
    y: 0
  })

  const handleScroll = () =>
    setState({
      x: window.pageXOffset,
      y: window.pageYOffset
    })

  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return state
}
const Scroll = ({ children, render }) => {
  const { x, y } = useScroll()
  if (render) {
    return render({ x, y })
  } else if (children) {
    return children({ x, y })
  } else {
    return undefined
  }
}

export { Scroll }
