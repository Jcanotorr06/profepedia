

interface Props{
    icon: string,
    className: string,
    handleClick: () => void
}

const IconButton = ({icon, className, handleClick}:Props) => {
  return (
    <button onClick={() => handleClick()} className={className}>
        <i className={`bi ${icon}`}/>
    </button>
  )
}

export default IconButton