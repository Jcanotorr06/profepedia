import React from 'react'
import Button from './Button'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    icon: string,
    className?: string,
    handleClick?: () => void,
    rippleClassName?: string
}

const IconButton = ({icon, handleClick, ...rest}:Props) => {
  return (
    <Button {...rest} handleClick={handleClick}>
      <i className={`bi ${icon}`}/>
    </Button>
  )
}

export default IconButton