import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import logo from '../Image/logo.jpeg'
import {Link} from "react-router-dom"

import './Navbar.css'

const Navbar = () => {

  //setting mobile nav 
  const [click, setClick] = useState(false)
    const handleClick = () => setClick(!click)

    //change nav color while scrolling
    const[color,setcolor]=useState(false)
    const changecolor=()=>{
      if(window.scrollY>=90){
        setcolor(true)
      }
      else{
        setcolor(false)
      }
    }

    window.addEventListener('scroll',changecolor)


    //close menu on click
    const closeMenu = () => setClick(false)

    return (
        <div className={color? 'header header-bg' : 'header'}>
            <nav className='navbar'>
            <a href='/' className='logo'>
    <img src={logo} alt='logo' style={{ width: '100px', height: 'auto', objectFit: 'contain' }} />
</a>

                {/* <div className='hamburger' onClick={handleClick}>
                    {click ? (<FaTimes size={30} style={{ color: '#ffffff' }} />)
                        : (<FaBars size={30} style={{ color: '#ffffff' }} />)}

                </div> */}
                <ul className={click ? "nav-menu active" : "nav-menu"}>
                    <li className='nav-item'>
                        <Link to='/' onClick={closeMenu}>Home</Link>
                    </li>
                    {/* <li className='nav-item'>
                        <Link to='/about' onClick={closeMenu}>About</Link>
                    </li> */}
                    <li className='nav-item'>
                        <Link to='/testimonals' onClick={closeMenu}>Testimonials</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/demo' onClick={closeMenu}>Demo</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/login' onClick={closeMenu}>Login</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/otp' onClick={closeMenu}>Signup</Link>
                        
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar