import debounce from 'debounce'
import React, {
  ComponentProps,
  FunctionComponent,
  useEffect,
  useState
} from 'react'

interface IRotationEvent extends Event {
  alpha: number
  beta: number
  gamma: number
}

interface IDeviceOrientationProps {
  children?: (props: IRotationEvent) => JSX.Element
  render?: (props: IRotationEvent) => JSX.Element
}

function useDeviceOrientation() {
  const [state, setState] = useState({
    alpha: 0,
    beta: 0,
    gamma: 0
  })

  function handleOrientationChange(event: IRotationEvent) {
    setState({
      alpha: event.alpha.toFixed(2),
      beta: event.beta.toFixed(2),
      gamma: event.gamma.toFixed(2)
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

const DeviceOrientation: FunctionComponent<IDeviceOrientationProps> = ({
  children,
  render
}) => {
  const childFunctionArgs = useDeviceOrientation()
  if (render) {
    return render(childFunctionArgs)
  } else if (children) {
    return children(childFunctionArgs)
  } else {
    return null
  }
}

export default DeviceOrientation
