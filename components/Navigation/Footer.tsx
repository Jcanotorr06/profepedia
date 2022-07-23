
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../public/logo.svg'
import Kofi from '../../public/landing/kofi.svg'

const Footer = () => {
  return (
    <footer className="flex items-center w-full px-4 py-3 text-xs gap-2">
      <div>
        Copyright &copy;2022 <span className="text-white font-bold">Profepedia</span>
      </div>
    </footer>
  )
}

export default Footer