import React from 'react'
import { motion } from 'framer-motion'

interface Props{
    ratio: number,
    textLeft: string,
    textRigth: string
}

const GradeBar = ({ratio, textLeft, textRigth}:Props) => {
    return (
        <div className="flex gap-4 items-center">
            <div className="flex-1">{textLeft}</div>
                <motion.div className="w-full h-10 ground overflow-hidden" style={{flex: 5}}>
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