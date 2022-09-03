import Image from 'next/image'
import React from 'react'
import Envelope from '../../public/login/envelope.svg'
import { Translate } from '../Translation'

const ReviewSuccessModal = () => {
  return (
    <div className="flex flex-col p-2 select-none">
        <div className='flex justify-center items-center mb-10'>
          <Image src={Envelope} alt="envelope" title="success" height={220} width={220}/>
        </div>
        <div className='text-center'>
          <h2 className="font-bold text-3xl">
            <Translate label="review_success_title"/>
          </h2>
        </div>
        <div className='text-center my-10 muted font-medium px-3'>
          <Translate label="review_success_message"/>
        </div>
    </div>
  )
}

export default ReviewSuccessModal