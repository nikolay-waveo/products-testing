import React from 'react'

interface ITitle {
  children: React.ReactNode,
}

const Title: React.FC<ITitle> = ({
  children,
}) => {
  return (
    <h1 className="">{ children }</h1>
  )
}

export default Title
