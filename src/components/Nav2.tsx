import { useState } from "react";
import { Link } from "react-scroll";
import {FaTimes} from "react-icons/fa"  
import {CiMenuFries} from "react-icons/ci"

const Nav2 = () => {
  const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

    const content = <>
    <div className="lg:hidden block absolute top-16 w-full left-0 right-0 bg-slate-900 transition">
        <ul className="text-center text-xl p-20">
            <Link spy={true} smooth={true} to="/"><li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">จุดตรวจวัด PM 2.5</li></Link>
            <Link spy={true} smooth={true} to="/map"><li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">แผนที่</li></Link>
            <Link spy={true} smooth={true} to="/weather"><li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">สภาพอากาศ</li></Link>
            <Link spy={true} smooth={true} to="#"><li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">เสียงรบกวน</li></Link>
            <Link spy={true} smooth={true} to="#"><li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">การจราจร</li></Link>
            <Link spy={true} smooth={true} to="/article"><li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">บทความ</li></Link>
        </ul>
    </div>
    </>
  return (
    <>
<nav className="bg-slate-900 text-white">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="/Home" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">SUPER <i className="text-amber-400">PROBE</i></span>
    </a>
    {/* <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button> */}
    <div className="hidden w-full md:block md:w-auto" id="">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-slate-900 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a href="/" className="block py-2 px-3 text-gray-50 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" aria-current="page" >หน้าหลัก</a>
        </li>
        <li>
          <a href="/Station" className="block py-2 px-3 text-gray-50 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" aria-current="page" >รายชื่อจุดตรวจวัด PM 2.5</a>
        </li>
        {/* <li>
          <a href="/map" className="block py-2 px-3 text-gray-50 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">แผนที่</a>
        </li> */}
        {/* <li>
          <a href="/weather" className="block py-2 px-3 text-gray-50 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">สภาพอากาศ</a>
        </li> */}
        <li>
          <a href="/testMap" className="block py-2 px-3 text-gray-50 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">แผนที่แสดง PM 2.5</a>
        </li>
        <li>
          <a href="/traffic" className="block py-2 px-3 text-gray-50 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">จุดให้บริการและจราจร</a>
        </li>
        
      </ul>
    </div>
    <div>
      {click && content}
    </div>
    <button className="block sm:hidden transtion" onClick={handleClick}>
                    {click ? <FaTimes/> : <CiMenuFries/>}
                </button>
  </div>
</nav>

    </>
  )
}

export default Nav2