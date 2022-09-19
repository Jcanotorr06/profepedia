
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../public/logo.svg'
import Kofi from '../../public/landing/kofi.svg'
import moment from 'moment'
import { Translate } from '../Translation'

const Footer = () => {
  return (
    <>
      <footer className="footer p-10 bg-neutral text-neutral-content">
        {/*  */}
        <section>
          <Translate className="footer-title text-neutral-content" label="navigate"/>
          <Link href="/" scroll={false}>
            <a>
              <Translate className="link link-hover text-neutral-content" label="home"/>
            </a>
          </Link>
          <Link href="/about" scroll={false}>
            <a>
              <Translate className="link link-hover text-neutral-content" label="about"/>
            </a>
          </Link>
          <Link href="/contacto" scroll={false}>
            <a>
              <Translate className="link link-hover text-neutral-content" label="contact"/>
            </a>
          </Link>
          <Link href="/faq" scroll={false}>
            <a>
              <Translate className="link link-hover text-neutral-content" label="faq"/>
            </a> 
          </Link>
          <a  href="https://ko-fi.com/profepedia" target="blank" rel="noref noopener">
            <Translate className="link link-hover text-neutral-content" label="donations"/>
          </a>
        </section>
        <section>
          <Translate className="footer-title text-neutral-content" label="legal"/>
          <Link href="/terminos" scroll={false}>
            <a>
              <Translate className="link link-hover text-neutral-content" label="terms_of_use"/>
            </a> 
          </Link>
          <Link href="/privacidad" scroll={false}>
            <a>
              <Translate className="link link-hover text-neutral-content" label="privacy_policy"/>
            </a> 
          </Link>
          <Link href="/reglas" scroll={false}>
            <a>
              <Translate className="link link-hover text-neutral-content" label="community_guidelines"/>
            </a> 
          </Link>
        </section>
        <section>
          <Translate className="footer-title text-neutral-content" label="social"/>
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