import { FormattedMessage } from "react-intl"

type Props = {
    label: string,
    defaultMessage?:string,
    values?: any,
    className?:string
}

const Translate = ({label,defaultMessage, values, className}:Props) => {
    return (
        <span data-translate={label} className={className}>
            <FormattedMessage id={label} defaultMessage={defaultMessage} values={values} />
        </span>
    )
}

export default Translate