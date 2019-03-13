import React, { useEffect, useState } from 'react'

interface INetworkState {
  offlineAt: Date | undefined
  online: boolean
}

interface INetworkProps {
  children?: (props: INetworkState) => JSX.Element
  render?: (props: INetworkState) => JSX.Element
}
function useNetwork(): INetworkState {
  const [state, setState] = useState({
    offlineAt: undefined,
    online: navigator.onLine
  })

  function toggle() {
    setState(s => ({
      ...s,
      ...(s.online && { offlineAt: new Date() }),
      ...(!s.online && { offlineAt: undefined }),
      online: !s.online
    }))
  }

  useEffect(() => {
    window.addEventListener('online', toggle)
    window.addEventListener('offline', toggle)

    return () => {
      window.removeEventListener('online', toggle)
      window.removeEventListener('offline', toggle)
    }
  })

  return state
}

const Network = ({ children, render }: INetworkProps) => {
  const { offlineAt, online } = useNetwork()
  if (render) {
    return render({ offlineAt, online })
  } else if (children) {
    return children({ offlineAt, online })
  } else {
    return undefined
  }
}

export { Network }
