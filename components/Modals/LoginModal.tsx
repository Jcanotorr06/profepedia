import Image from 'next/image'
import Logo from '../../public/logo.svg'
import { SubmitHandler, useForm } from 'react-hook-form';
import { FC } from 'react';
import { Translate } from '../Translation';
import { TextButton } from '../Buttons';
import { useIntl } from 'react-intl';
import { useModal, useUser } from '../../context';
import { Loading } from '../Navigation';
import { toast } from 'react-toastify';

interface LoginInput{
  email: string
}


const LoginModal:FC = () => {
  const { register, handleSubmit, formState:{errors, isValid, isDirty, isSubmitting} } = useForm<LoginInput>({mode: "onChange"})
  const intl = useIntl()
  const { login, loading } = useUser()
  const { openModal } = useModal()

  const onSubmit:SubmitHandler<LoginInput> = async (data) => {
    console.log(data)
    await login(data.email)
      .then(res => {
        if(res){
          openModal("LOGIN_CONFIRMATION")
          toast.success(intl.formatMessage({id: "login_sent_success", defaultMessage: "Correo enviado exitosamente"}))
        }else{
          toast.error(intl.formatMessage({id: "login_error", defaultMessage: "Ha ocurrido un error al enviar el correo"}))
        }
      })
  }

  return (
    <Loading className='w-full h-full rounded-xl' active={loading}>
      <div className="flex flex-col p-2 select-none">
        <div className='flex justify-center items-center mb-10'>
          <Image src={Logo} alt="profepedia logo" title="Profepedia" height={75} width={75}/>
        </div>
        <div className='text-center'>
          <h2 className="font-bold text-2xl">
            <Translate label="login_title"/>
          </h2>
        </div>
        <div className='text-center my-10 muted font-medium'>
          <Translate label="login_message"/>
        </div>
        <form className="flex flex-col px-4 gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-text">
            <input 
              type="email" 
              className={`text-sm text-input w-full py-3 ${errors.email ? "border-red-400" : ""}`} 
              style={{padding: '0.75rem 0'}}
              placeholder={intl.formatMessage({id: "login_email_ph", defaultMessage: "Dirección de correo universitaria"})}
              {...register("email", {required: true, pattern: {value: /^[a-zA-Z]{1,15}\.{1}[a-zA-Z]{1,15}\d?@utp.ac.pa$/g, message: 'invalid_email'}})} />
          </div>
            {errors.email?.message && <span className='text-xs font-semibold'><Translate label={errors.email.message} className="text-xs text-red-400 font-semibold"/>&nbsp;</span>}
          <TextButton
            text="send_auth_email"
            className="py-4 rounded-full button-primary w-full font-bold"
            type="submit"
            rippleClassName="mt-10 rounded-full"
            handleClick={() => {}}
            disabled={!isValid || !isDirty || isSubmitting}
          />
        </form>
        <div className='mt-10 text-center muted font-bold'>
          <small><Translate label="login_disclaimer"/></small>
        </div>
      </div>
    </Loading>
  )
}

export default LoginModal