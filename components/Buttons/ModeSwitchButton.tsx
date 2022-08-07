import React from 'react'
import { useMode } from '../../context'
import IconButton from './IconButton'

const ModeSwitchButton = () => {

    const { swapMode, mode } = useMode()
    const classNames = {
        'light': 'text-yellow-400 hover:text-yellow-500 border-yellow-400 focus:text-yellow-600 focus:border-yellow-300',
        'dark': 'text-indigo-500 hover:text-indigo-300 border-indigo-400 focus:text-indigo-300 focus:border-indigo-500'
      }
  return (
    <IconButton
        icon={mode === 'light' ? 'bi-sun-fill' : 'bi-moon-stars-fill'} 
        className={`icon-btn py-2 px-3 rounded-full text-lg border lg:border-transparent ${classNames[mode]}`}
        rippleClassName="rounded-full" 
        handleClick={() => swapMode()}/>
  )
}

export default ModeSwitchButton