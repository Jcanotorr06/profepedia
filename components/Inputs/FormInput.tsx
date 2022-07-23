import React, { FC } from 'react'
import Input from './Input';

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

const FormInput:FC<Props> = ({id, name, label, type, size, className, disabled}) => {
  return (
    <div>
        <label htmlFor={id}>{label}</label>
        <Input
            id={id}
            name={name}
            type={type}
            label={label}
            className={className}
            disabled={disabled}
        />
    </div>
  )
}

export default FormInput