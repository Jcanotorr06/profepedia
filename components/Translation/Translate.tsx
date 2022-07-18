import { FormattedMessage } from "react-intl"

type Props = {
    label: string,
    defaultMessage?:string,
    values?: any
}

const Translate = ({label,defaultMessage, values}:Props) => {
    return (
        <span data-translate={label}>
            <FormattedMessage id={label} defaultMessage={defaultMessage} values={values} />
        </span>
    )
}

export default Translate