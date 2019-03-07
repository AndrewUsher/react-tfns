import React, {
  ComponentProps,
  ElementType,
  FunctionComponent,
  useEffect,
  useState
} from 'react'

export interface IRotationEvent {
  alpha: number
  beta: number
  gamma: number
}

export interface IDeviceOrientationProps {
  children?: (props: IRotationEvent) => JSX.Element
  render?: (props: IRotationEvent) => JSX.Element
}

export type DeviceOrientationType = FunctionComponent<IDeviceOrientationProps>

function useDeviceOrientation () {
  const [state, setState] = useState({
    alpha: 0,
    beta: 0,
    gamma: 0
  })

  function handleOrientationChange (event: IRotationEvent) {
    setState({
      alpha: event.alpha,
      beta: event.beta,
      gamma: event.gamma
    })
  }

  useEffect(() => {
    window.addEventListener('deviceorientation', handleOrientationChange)
    return () => {
      window.removeEventListener('deviceorientation', handleOrientationChange)
    }
  })

  return state
}

const DeviceOrientation: DeviceOrientationType = ({ children, render }) => {
  const childFunctionArgs = useDeviceOrientation()
  if (render) {
    return render(childFunctionArgs)
  } else if (children) {
    return children(childFunctionArgs)
  } else {
    return undefined
  }
}

export { DeviceOrientation }
