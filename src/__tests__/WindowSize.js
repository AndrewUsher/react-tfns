import React from 'react'
import { cleanup, render } from 'react-testing-library'
import { WindowSize } from '../WindowSize'

afterEach(cleanup)

describe('WindowSize component', () => {
  test('Renders with initial window size', () => {
    window.innerWidth = 400
    window.innerHeight = 450
    const { getByText } = render(
      <WindowSize
        render={({ height, width }) => (
          <div>
            <h2>Width: {width}</h2>
            <h2>Height: {height}</h2>
          </div>
        )}
      />
    )
    expect(getByText('Width: 400')).toBeTruthy()
    expect(getByText('Height: 450')).toBeTruthy()
  })
})
