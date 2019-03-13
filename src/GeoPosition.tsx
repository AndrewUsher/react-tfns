import React, { useEffect, useState } from 'react'

type GeoSuccessCallback = {
  coords: {
    latitude: number
    longitude: number
  }
}

type GeoPositionHookTypes = {
  coords: undefined | GeoSuccessCallback
  error: undefined | PositionError
  isLoading: undefined | boolean
}

type GeoPositionProps = {
  children?: (props: GeoPositionHookTypes) => JSX.Element
  render?: (props: GeoPositionHookTypes) => JSX.Element
}

function useGeoPosition() {
  const [state, setState] = useState({
    isLoading: undefined,
    coords: undefined,
    error: undefined
  })

  const handleGeoSuccess = ({
    coords: { latitude, longitude }
  }: GeoSuccessCallback) =>
    setState({
      coords: {
        latitude,
        longitude
      },
      error: undefined,
      isLoading: false
    })

  const handleGeoError = (error: PositionError) =>
    setState({
      error,
      coords: undefined,
      isLoading: false
    })

  useEffect(() => {
    setState(s => ({
      ...s,
      isLoading: true
    }))

    navigator.geolocation.watchPosition(handleGeoSuccess, handleGeoError, {
      enableHighAccuracy: true
    })
  }, [])

  return state
}

const GeoPosition = ({ children, render }: GeoPositionProps) => {
  const geoPositionData = useGeoPosition()
  if (render) {
    return render(geoPositionData)
  } else if (children) {
    return children(geoPositionData)
  } else {
    return null
  }
}

export { GeoPosition }
