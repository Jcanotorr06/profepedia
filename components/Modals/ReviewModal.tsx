import React from 'react'
import { useProfessor } from '../../context'
import { formatNombre } from '../../utils/utils'
import { Loading } from '../Navigation'
import { Translate } from '../Translation'

const ReviewModal = () => {
    const { data } = useProfessor()

    return (
    <Loading active={false} className="w-full h-full rounded-xl">
        <div className="flex flex-col p-2 select-none">
            <div className="p-1">
                <h1 className='text-2xl font-medium'><Translate label="you_are_rating"/> <span className="font-black">{data && formatNombre(data.nombre)}</span></h1>
            </div>
        </div>
    </Loading>
    )
}

export default ReviewModal