import React from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'

interface Props{
    name: string,
    label: string,
    options: {
        label: string,
        value: string | number
    }[],
    placeholder: string,
    register: UseFormRegister<any>,
    config: {
      required?: boolean | string,
      valueAsNumber?: boolean,
      min?: number,
      max?: number
    },
    error?: FieldError,
    dirty?: boolean
}

const Select = ({name, label, placeholder, options, config, register, error, dirty}:Props) => {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label-text">{label}</label>
      <select value={undefined} className="select select-bordered" {...register(name, {...config})}>
        <option selected disabled hidden>{placeholder}</option>
        {options.map((opt, i) => (
          <option value={opt.value} key={i}>{opt.label}</option>
        ))}
      </select>
      {error && dirty &&
            <div className='mt-10 text-center muted font-bold'>
                <small>{error.message}</small>
            </div>
        }
    </div>
  )
}

export default Select