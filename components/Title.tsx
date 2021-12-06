import React from 'react'
import { ITitle } from 'types'

const Title: React.FC<ITitle> = ({
  children,
}) => {
  return (
    <h1 className="font-sans text-4xl font-bold">{ children }</h1>
  )
}

export default Title
