import { useState, useRef } from 'react';
import Image from 'next/image';
import { FaBars, FaArrowDown } from 'react-icons/fa';

import { gsap } from 'gsap';
import { useGSAP } from "@gsap/react";

import 'tailwindcss/tailwind.css';
import '../style/style.css';

export default function FirstHeader({ landingRef, aboutRef, workRef, skillsRef, contactRef }) {
    const [isOpen, setIsOpen] = useState(false);
    const handleMouseEnter = () => setIsOpen(true);
    const handleMouseLeave = () => setIsOpen(false);
    const arrowRef = useRef(null);

    const scrollToRef = (e, ref) => {
        e.preventDefault();
        ref.current.scrollIntoView({ behavior: 'smooth' });
    };

    useGSAP(() => {
        if (arrowRef.current) {
            gsap.to(arrowRef.current, {
                y: 5,
                duration: 0.8,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
            });
        }
    }, []);

    return (
        <>
            <div className="header flex justify-between items-center">
                <span className='logo p-3 bg-[#f9f9f9]'>
                    <Image src="/logo.png" width={70} height={70} alt='logo' />
                </span>
                <span className='flex items-center gap-2 mr-[5%]'>
                    scroll down <span className='bg-[#f9f9f9] rounded-[50%] text-[#1c1b19] p-3 text-[14px]'><  FaArrowDown ref={arrowRef} /></span>
                </span>
            </div>

            <div className='hidden lg:inline-block'>
                <span className="dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <button className="dropdown-button"><FaBars /></button>
                    {isOpen && (
                        <nav className="dropdown-menu">
                            <ul>
                                <li><a href="#home" onClick={(e) => scrollToRef(e, landingRef)}>Home</a></li>
                                <li><a href="#about" onClick={(e) => scrollToRef(e, aboutRef)}>About</a></li>
                                <li><a href="#work" onClick={(e) => scrollToRef(e, workRef)}>Work</a></li>
                                <li><a href="#skills" onClick={(e) => scrollToRef(e, skillsRef)}>Skills</a></li>
                                <li><a href="#contact" onClick={(e) => scrollToRef(e, contactRef)}>Contact</a></li>
                            </ul>
                        </nav>
                    )}
                </span>
            </div>
        </>
    );
}