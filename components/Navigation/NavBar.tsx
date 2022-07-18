import Image from "next/image"


const NavBar = () => {
  return (
    <nav className="bg-transparent w-full top-0 mb-4">
        <Image src="/logo.svg" height={40} width={40} alt="logo"/>
    </nav>
  )
}

export default NavBar