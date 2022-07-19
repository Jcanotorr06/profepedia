
import { FocusEventHandler, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale } from './../../context/LocaleContext';

const LanguageDropdown = () => {
    const {locale, changeLocale} = useLocale()
    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    
    const handleDropdown = () => {
        setShowDropdown(!showDropdown)
    }

    const handleBlur:FocusEventHandler<HTMLButtonElement> = (e) => {
        if(!e.relatedTarget){
            setShowDropdown(false)
        }
    }

    const handleChangeLocale = (locale:'es'|'en') => {
        changeLocale(locale)
        setShowDropdown(false)
    }

    const locales:('es'|'en')[] = [
        'es',
        'en'
    ]

    return (
        <div className="relative">
            <button 
                className="text-center py-2 px-8 rounded-full font-bold bg-white border border-transparent hover:cursor-pointer hover:border-slate-200 focus:border-slate-300"
                onClick={() => handleDropdown()}
                onBlur={handleBlur}>
                {locale.toUpperCase()}&nbsp;
                <motion.div
                key={`${showDropdown}`}
                initial={{opacity: 1, rotate: 180}} 
                animate={{opacity:1, rotate: 0}}
                className='inline-block'>
                    <i className={`bi text-red-400 ${showDropdown ? 'bi-chevron-up' : 'bi-chevron-down'}`}/>
                </motion.div>
            </button>
            <AnimatePresence>
                {showDropdown && (
                    <motion.div 
                    key="locale_dropdown"
                    initial={{opacity: 0, y: -100, scale: 0}}
                    animate={{opacity: 1, y: 0, scale: 1}}
                    exit={{opacity: 0, y: -50, scale: 0}}
                    className="absolute rounded-md flex flex-col bg-white drop-shadow-sm w-full top-12">
                        {locales.map((loc, i) => (
                            <button  
                                key={i} 
                                className="px-4 py-3 font-bold bg-white w-full hover:bg-slate-100 rounded-md"
                                onClick={() => handleChangeLocale(loc)}>
                                {loc.toUpperCase()}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default LanguageDropdown