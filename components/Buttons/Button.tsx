import React, { ReactNode } from 'react'
import Ripples from 'react-ripples'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode
    className?: string,
    rippleClassName?: string,
    handleClick?: () => void
}

const Button = ({children, className, rippleClassName, handleClick, onClick, ...rest}:Props) => {
  return (
    rest.disabled ? 
      <button {...((rest.type !== 'submit' && handleClick !== undefined) ? { onClick:() => handleClick()} :{}) } className={`${className}`} {...rest}>
              {children}
      </button>
    :
      <Ripples className={rippleClassName} during={500}>
          <button {...((rest.type !== 'submit' && handleClick !== undefined) ? { onClick:() => handleClick()} :{}) } className={`${className}`} {...rest}>
              {children}
          </button>
      </Ripples>
  )
}

export default Button