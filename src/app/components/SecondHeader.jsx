import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { FaBars } from 'react-icons/fa';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import '../style/style.css';
import 'tailwindcss/tailwind.css';

export default function SecondHeader({ landingRef, aboutRef, workRef, skillsRef, contactRef }) {
    const secondHeaderRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const handleMouseEnter = () => setIsOpen(true);
    const handleMouseLeave = () => setIsOpen(false);

    const scrollToRef = (e, ref) => {
        e.preventDefault();
        ref.current.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (!landingRef.current) return;

        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo(
            secondHeaderRef.current,
            { y: 200 },
            {
                scrollTrigger: {
                    trigger: landingRef.current,
                    start: 'bottom top',
                    end: 'bottom -100',
                    onEnter: () => gsap.to(secondHeaderRef.current, { opacity: 1, duration: 0.5, y: 0 }),
                    onLeaveBack: () => gsap.to(secondHeaderRef.current, { opacity: 1, duration: 0.5, y: 200 }),
                },
            }
        );
    }, [landingRef]);

    return (
        <div ref={secondHeaderRef} className="second-header flex justify-center fixed bottom-0 left-0 right-0 z-50 mb-4 lg:flex">
            <div className="flex items-center">
                <span className="second-logo p-3 bg-[#f9f9f9]">
                    <Image src="/logo.png" width={70} height={70} alt="logo" />
                </span>
                <div className="second-dropdown relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <button className="second-dropdown-button"><FaBars /></button>
                    {isOpen && (
                        <nav className="second-dropdown-menu">
                            <ul className="flex">
                                <li><a href="#home" onClick={(e) => scrollToRef(e, landingRef)}>Home</a></li>
                                <li><a href="#about" onClick={(e) => scrollToRef(e, aboutRef)}>About</a></li>
                                <li><a href="#work" onClick={(e) => scrollToRef(e, workRef)}>Work</a></li>
                                <li><a href="#skills" onClick={(e) => scrollToRef(e, skillsRef)}>Skills</a></li>
                                <li><a href="#contact" onClick={(e) => scrollToRef(e, contactRef)}>Contact</a></li>
                            </ul>
                        </nav>
                    )}
                </div>
            </div>
        </div>
    );
}
