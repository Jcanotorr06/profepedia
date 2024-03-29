import React from 'react'
import { motion } from 'framer-motion'
import { Translate } from '../Translation'

interface Props{
    ratio: number,
    textLeft: string,
    textRigth: string
}

const GradeBar = ({ratio, textLeft, textRigth}:Props) => {
    return (
        <div className="flex gap-4 items-center text-sm md:text-base">
            <div className="w-1/4 xl:w-1/6"><Translate label={textLeft}/></div>
                <motion.div className="w-full h-10 ground overflow-hidden drop-shadow rounded-md flex-1">
                    <motion.div 
                        initial={{width: 0}} 
                        animate={{width: `${100*ratio}%`}} 
                        transition={{duration: 3, delay: 0.5, ease: "easeInOut"}} 
                        className="h-full bg-blue-400">
                    </motion.div>
                </motion.div>
            <div>{textRigth}</div>
        </div>
    )
}

export default GradeBar