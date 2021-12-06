import React from 'react'

interface IContainer {
  children: React.ReactNode
}

const Container: React.FC<IContainer> = ({
  children
}) => {
  return (
    <div className="container min-h-screen p-12 bg-gray-50">
      {children}
    </div>
  )
}

export default Container
