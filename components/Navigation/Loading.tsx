import { ReactNode } from 'react'
import Load from 'react-loading';

interface Props{
    children: ReactNode,
    active: boolean,
    className: string
}

const Loading = ({ children, active, className }:Props) => {
  return (
    <>
        {active ? 
            <div className={`absolute z-10 top-0 left-0 bg-black bg-opacity-20 flex justify-center items-center ${className}`}>
                <Load type="spin" color="#fff"/>
            </div>:
            children
        }
    </>
  )
}

export default Loading