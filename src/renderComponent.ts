export function renderComponent(
  children: () => JSX.Element,
  render: () => JSX.Element,
  childFunctionArgs
) {
  if (children) {
    return children(childFunctionArgs)
  } else if (render) {
    return render(childFunctionArgs)
  } else {
    return null
  }
}
