import React from 'react'
import { ITitle } from 'types'

const Title: React.FC<ITitle> = ({
  children,
}) => {
  return (
    <h1 className="p-5 px-10 font-sans text-4xl font-semibold text-white bg-indigo-500">{ children }</h1>
  )
}

export default Title
