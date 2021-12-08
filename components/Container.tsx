import React from 'react'
import { IContainer } from 'types'

const Container: React.FC<IContainer> = ({
  children
}) => {
  return (
    <div className="container min-h-screen p-12 space-y-9 bg-gray-50">
      {children}
    </div>
  )
}

export default Container
