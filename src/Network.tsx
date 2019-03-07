import React, { useEffect, useState } from 'react'

function useNetwork () {
  const [state, setState] = useState({
    offlineAt: undefined,
    online: false
  })

  function toggle () {
    setState(s => ({
      ...s,
      ...(!s.online && { offlineAt: new Date() }),
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

const Network = ({ children, render }) => {
  const { offlineAt, online } = useNetwork()
  if (render) {
    return render({ offlineAt, online })
  } else if (children) {
    return children({ offlineAt, online })
  } else {
    return undefined
  }
}
