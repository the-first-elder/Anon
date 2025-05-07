import React from 'react'
import logo from '../assets/foot-logo.svg'

const MobileHeader = () => {
  return (
    <header className='flex lg:hidden md:hidden justify-between items-center w-[90%] mx-auto my-12'>
        <img src={logo} alt="" className='w-[60px]'/>
        <button className="flex py-3 px-6 rounded-lg items-center bg-dark text-white font-Roboto font-semibold">Connect Wallet</button>
    </header>
  )
}

export default MobileHeader