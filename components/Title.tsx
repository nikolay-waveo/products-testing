import React from 'react'
import { ITitle } from 'types'

const Title: React.FC<ITitle> = ({
  children,
}) => {
  return (
    <h1 className="p-5 font-sans text-3xl font-semibold text-white bg-indigo-600">{ children }</h1>
  )
}

export default Title
