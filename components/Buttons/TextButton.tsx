import React from "react"
import { Translate } from "../Translation"
import Button from './Button'


interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    text: string,
    handleClick: () => void,
    className: string,
    rippleClassName: string
}

const TextButton = ({text, ...rest}:Props) => {
  return (
    <Button {...rest}>
      <Translate label={text}/>
    </Button>
  )
}

export default TextButton