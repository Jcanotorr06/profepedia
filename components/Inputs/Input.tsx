import React, { FC } from 'react'

type InputSize = 'small' | 'medium' | 'large'
type InputType = 'text' | 'email' | 'date' | 'number' | 'time' | 'checkbox' | 'hidden' | 'radio' | 'range' 

interface Props{
    id: string,
    name: string,
    label: string,
    type?: InputType,
    size?: InputSize,
    className?: string,
    disabled?: boolean,

}

const Input:FC<Props> = ({id, name, label, type='text', size='medium', className, disabled}) => {
  return (
    <input
        id={id}
        name={name}
        type={type}
        aria-label={label}
        className={className}
        disabled={disabled}
    />
  )
}

export default Input