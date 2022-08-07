
import { FocusEventHandler, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale } from './../../context/LocaleContext';
import TextButton from './../Buttons/TextButton';

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
                className="text-center py-3 lg:py-2 px-8 rounded-full w-full font-bold dropdown border lg:border-transparent hover:cursor-pointer hover:border-slate-200 focus:border-slate-300"
                onClick={() => handleDropdown()}
                onBlur={handleBlur}>
                    <span>
                        {locale.toUpperCase()}&nbsp;
                    </span>
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
                    <motion.nav 
                    key="locale_dropdown"
                    initial={{opacity: 0, y: -100, scale: 0}}
                    animate={{opacity: 1, y: 0, scale: 1}}
                    exit={{opacity: 0, y: -50, scale: 0}}
                    className="absolute rounded-md flex flex-col drop-shadow-sm w-full top-12 z-30 border lg:border-transparent">
                        {locales.map((loc, i) => (
                            <TextButton  
                                key={i} 
                                className="px-4 py-3 font-bold w-full rounded-md"
                                rippleClassName='rounded-md'
                                handleClick={() => handleChangeLocale(loc)}
                                text={loc.toUpperCase()}/>
                        ))}
                    </motion.nav>
                )}
            </AnimatePresence>
        </div>
    )
}

export default LanguageDropdown