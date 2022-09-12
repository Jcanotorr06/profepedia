
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../public/logo.svg'
import Kofi from '../../public/landing/kofi.svg'
import moment from 'moment'

const Footer = () => {
  return (
    <>
      <footer className="footer p-10 bg-neutral text-neutral-content">
        {/*  */}
        <section>
          <span className="footer-title text-neutral-content">Navigate</span>
          <Link href="/" scroll={false}>
            <a className="link link-hover text-neutral-content">Inicio</a>
          </Link>
          <Link href="/about" scroll={false}>
            <a className="link link-hover text-neutral-content">About us</a> 
          </Link>
          <Link href="/contacto" scroll={false}>
            <a className="link link-hover text-neutral-content">Contact</a> 
          </Link>
          <Link href="/faq" scroll={false}>
            <a className="link link-hover text-neutral-content">Faq</a> 
          </Link>
        </section>
        <section>
          <span className="footer-title text-neutral-content">Legal</span>
          <Link href="/terminos" scroll={false}>
            <a className="link link-hover text-neutral-content">Terms of Use</a> 
          </Link>
          <Link href="/privacidad" scroll={false}>
            <a className="link link-hover text-neutral-content">Privacy Policy</a> 
          </Link>
          <Link href="/reglas" scroll={false}>
            <a className="link link-hover text-neutral-content">Community Guidelines</a>
          </Link>
        </section>
        <section>
          <span className="footer-title text-neutral-content">Social</span>
          <div className="grid grid-flow-col gap-4">
            <a href="https://www.instagram.com/myprofepedia/" target="_blank" rel="noopener noreferrer" title="Instagram"><i className="bi bi-instagram text-neutral-content"/></a>
            <a href="https://medium.com/@myprofepedia" target="_blank" rel="noopener noreferrer" title="Medium"><i className="bi bi-medium text-neutral-content"/></a>
            <a href="https://github.com/Jcanotorr06/profepedia" target="_blank" rel="noopener noreferrer" title="Github"><i className="bi bi-github text-neutral-content"/></a>
          </div>
        </section>
      </footer>
      <footer className="footer footer-center bg-neutral text-neutral-content py-4">
        <section>
          <p className='text-neutral-content'>Copyright © {moment().year()} - All rights reverved by Profepedia</p>
        </section>
      </footer>
    </>
  )
}

export default Footer