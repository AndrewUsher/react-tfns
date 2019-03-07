import { debounce } from "debounce"
import React, { useEffect, useState } from "react"

function useWindowSize() {
  const [state, setState] = useState({
    height: 0,
    width: 0,
  })

  const handleResize = () =>
    setState({
      height: window.innerHeight,
      width: window.innerWidth,
    })

  useEffect(() => {
    setState({
      height: window.innerHeight,
      width: window.innerWidth,
    })
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return state
}

const WindowSize = ({ children, render }) => {
  const { height, width } = useWindowSize()
  if (render) {
    return render({ height, width })
  } else if (children) {
    return children({ height, width })
  } else {
    return null
  }
}

export default WindowSize
