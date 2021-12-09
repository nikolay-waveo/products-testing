import React from 'react'
import { IContainer } from 'types'

const Container: React.FC<IContainer> = ({
  children
}) => {
  return (
    <div className="min-h-screen space-y-9 bg-gray-100">
      {children}
    </div>
  )
}

export default Container
