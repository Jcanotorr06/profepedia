import { Translate } from "../Translation"


interface Props{
    text: string,
    handleClick: () => void,
    className: string
}

const Button = ({text, handleClick, className}:Props) => {
  return (
    <button onClick={() => handleClick()} className={`${className}`}>
        <Translate label={text}/>
    </button>
  )
}

export default Button