import { createContext, ReactNode, useContext, useState } from "react"
import { IntlProvider } from 'react-intl'
import { ES, EN } from '../locales'

type localeContext = {
    locale: "es" | "en",
    messages: any,
    changeLocale: (lang:'es'|'en') => void
}

const localeContextDefault:localeContext = {
    locale: "es",
    messages: ES,
    changeLocale(lang:'es'|'en') {
        
    },
}

const LocaleContext = createContext<localeContext>(localeContextDefault)

export function useLocale() {
    return useContext(LocaleContext)
}

type Props = {
    children: ReactNode
}

export function LocaleProvider({children}:Props) {
    const [locale, setLocale] = useState<"es"|"en">("es")
    const [messages, setMessages] = useState<any>(ES)

    const changeLocale = (lang:'es'|'en') => {
        switch (lang) {
            case 'es':
                setLocale('es')
                setMessages(ES)
                break;
            case 'en':
                setLocale('en')
                setMessages(EN)
                break;
            default:
                setLocale('es')
                setMessages(ES)
                break;
        }
    }

    const value:localeContext = {
        locale,
        messages,
        changeLocale
    }

    return (
        <>
            <LocaleContext.Provider value={value}>
                <IntlProvider locale={locale} defaultLocale="es" messages={messages}>
                    {children}
                </IntlProvider>
            </LocaleContext.Provider>
        </>
    )
}