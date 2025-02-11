'use client';
import './style/style.css';
import Image from 'next/image';
import React, { useState, useRef, useEffect, use } from 'react';
import { FaBars, FaArrowDown, FaExternalLinkAlt, FaLinkedin } from 'react-icons/fa';
import { FaSquareFacebook, FaSquareGithub } from "react-icons/fa6";
import { gsap } from 'gsap';
import 'tailwindcss/tailwind.css';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ModifMarquee from "./components/Marquee";
import { Cards, skillsData } from './data';
import ModifHr from './components/ModifHr';
import SuperposedMarquee from './components/SuperposedMarquee';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const textRef = useRef(null);
  const annonceRef = useRef(null);
  const aboutTitleRef = useRef(null);
  const mainRef = useRef(null);
  const secondHeaderRef = useRef(null);
  const contact = useRef(null);
  const contactInformation = useRef(null);
  const landingRef = useRef(null);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  useEffect(() => {
    const initAnimation = async () => {
      const Splitting = (await import('splitting')).default;

      if (textRef.current) {
        const results = Splitting({ target: textRef.current, by: 'chars' });
        const chars = results[0].chars;

        gsap.from(chars, {
          opacity: 0,
          stagger: 0.05,
          scrollTrigger: {
            trigger: mainRef.current,
            start: 'top 50%',
            end: 'bottom bottom',
            scrub: true,
          },
        });
      }
    };

    initAnimation();
  }, []);

  useEffect(() => {
    import('gsap').then((gsapModule) => {
      const gsap = gsapModule.default;
      import('gsap/ScrollTrigger').then((ScrollTriggerModule) => {
        const ScrollTrigger = ScrollTriggerModule.default;
        gsap.registerPlugin(ScrollTrigger);


        if (annonceRef.current) {
          gsap.from(annonceRef.current, {
            opacity: 0,
            duration: 1,
            scrollTrigger: {
              trigger: mainRef.current,
              start: 'top 50%',
              end: 'top 40%',
              scrub: true,
            },
          });
        }

        if (aboutTitleRef.current) {
          gsap.from(aboutTitleRef.current, {
            opacity: 0,
            duration: 1,
            y: '-50px',
            scrollTrigger: {
              trigger: mainRef.current,
              start: 'top 50%',
              end: 'top 40%',
              scrub: true,
            },
          });
        }

        if (mainRef.current) {
          gsap.to(mainRef.current, {
            y: '-0vh',
            scrollTrigger: {
              trigger: landingRef.current,
              start: 'top top',
              end: 'bottom top',
              pin: true,
              scrub: true,
              pinSpacing: false,
              invalidateOnRefresh: true,
            },
          });
        }


        if (secondHeaderRef.current) {
          gsap.from(secondHeaderRef.current, {
            opacity: 0,
            y: '200px',
            scrollTrigger: {
              trigger: mainRef.current,
              start: 'top bottom',
              end: 'top bottom',
              onEnter: () => gsap.to(secondHeaderRef.current, { opacity: 1 }),
              onLeaveBack: () => gsap.to(secondHeaderRef.current, { opacity: 0 }),
            },
          });
        }

        const skills = gsap.utils.toArray(".skill");
        const isMobile = window.innerWidth < 768;
        const spacer = isMobile ? 100 : 200;
        const duration = isMobile ? 200 : 300;
        skills.forEach((skill, index) => {
          ScrollTrigger.create({
            trigger: skill,
            start: `top-=${index * spacer} top`,
            endTrigger: '.skills',
            end: `bottom top+=${duration + (skills.length * spacer)}`,
            pin: true,
            pinSpacing: false,
            id: 'pin',
            invalidateOnRefresh: true,
          });
        });
      });
    });

    import('@studio-freight/lenis').then((LenisModule) => {
      const Lenis = LenisModule.default;
      const lenis = new Lenis({
        duration: 1.5,
        easing: (t) => 1 - Math.pow(1 - t, 4),
        smooth: true,
        smoothTouch: true,
      });
      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
      return () => lenis.destroy();
    });
  }, []);


  useEffect(() => {
    if (typeof window !== 'undefined' && document) {
      gsap.registerPlugin(ScrollTrigger);
      const workDetails = document.querySelectorAll(".work-details");

      workDetails.forEach((work, index) => {
        const workContent = work.querySelector(`.work-content-${index}`);
        const workTitle = work.querySelector(`.work-title-${index}`);

        import('gsap').then((gsapModule) => {
          const gsap = gsapModule.default;
          import('gsap/ScrollTrigger').then((ScrollTriggerModule) => {
            const ScrollTrigger = ScrollTriggerModule.default;
            gsap.registerPlugin(ScrollTrigger);

            ScrollTrigger.create({
              trigger: work,
              start: `top ${350}px`,
              end: `bottom top`,
              onEnter: () => {
                gsap.to(workContent, { opacity: 1, display: "block", duration: 0 });
                gsap.to(workTitle, { color: "#1c1b19", duration: 0 });
                gsap.to(work, { backgroundColor: "#f9f9f9", color: "#1c1b19", duration: 0 });

                workDetails.forEach((otherWork, otherIndex) => {
                  if (otherIndex !== index) {
                    const otherContent = otherWork.querySelector(`.work-content-${otherIndex}`);
                    const otherTitle = otherWork.querySelector(`.work-title-${otherIndex}`);
                    gsap.to(otherContent, { opacity: 0, display: "none", duration: 0 });
                    gsap.to(otherTitle, { color: "#f9f9f9", duration: 0 });
                    gsap.to(otherWork, { backgroundColor: "#1c1b19", color: "#f9f9f9", duration: 0 });
                  }
                });
              },
              onLeaveBack: () => {
                gsap.to(workContent, { opacity: 0, display: "none", duration: 0 });
                gsap.to(workTitle, { color: "#f9f9f9", duration: 0 });
                gsap.to(work, { backgroundColor: "#1c1b19", color: "#f9f9f9", duration: 0 });

                if (index > 0) {
                  const prevContent = workDetails[index - 1].querySelector(`.work-content-${index - 1}`);
                  const prevTitle = workDetails[index - 1].querySelector(`.work-title-${index - 1}`);
                  gsap.to(prevContent, { opacity: 1, display: "block", duration: 0 });
                  gsap.to(prevTitle, { color: "#1c1b19", duration: 0 });
                  gsap.to(workDetails[index - 1], { backgroundColor: "#f9f9f9", color: "#1c1b19", duration: 0 });
                }
              },
            });
          });
        });
      });
    }
  }, [Cards]);

  return (
    <>
      <div ref={secondHeaderRef} className="second-header flex justify-center fixed bottom-0 left-0 right-0 z-50 mb-4 opacity-1 hidden lg:flex">
        <div className="flex items-center">
          <span className="second-logo p-3 bg-[#f9f9f9]">
            <Image src="/logo.png" width={70} height={70} alt="logo" />
          </span>
          <div className="second-dropdown relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button className="second-dropdown-button"><FaBars /></button>
            {isOpen && (
              <div className="second-dropdown-menu">
                <ul className="flex">
                  <li>about</li>
                  <li>work</li>
                  <li>contact</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='landing text-[#f9f9f9] h-screen' ref={landingRef}>
        <div className="header flex justify-between items-center">
          <span className='logo p-3 bg-[#f9f9f9]'>
            <Image src="/logo.png" width={70} height={70} alt='logo' />
          </span>
          <span className='flex items-center gap-2 mr-[5%]'>
            scroll down <span className='bg-[#f9f9f9] rounded-[50%] text-[#1c1b19] p-3 text-xl'><FaArrowDown /></span>
          </span>
        </div>

        <div className='hidden lg:inline-block'>
          <span className="dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button className="dropdown-button"><FaBars /></button>
            {isOpen && (
              <div className="dropdown-menu">
                <ul>
                  <li>about</li>
                  <li>work</li>
                  <li>contact</li>
                </ul>
              </div>
            )}
          </span>
        </div>

        <div className="simple-word lg:pl-[35%] lg:pr-[15%] mt-[15%] lg:mt-0 mx-5 lg:mx-0">
          <p className="leading-none text-[3em] lg:text-[6em]">THINGS THAT YOU ARE NOT PROUD OF SHOULDN'T BE SIGNED BY YOUR NAME.</p>
          <p className='font-sans'>Show your worth through your work.</p>
        </div>

        <div className="foot grid grid-cols-12">
          <span className='pl-0 lg:pl-2 word col-span-8 lg:col-span-10 pr-2'>Developer for startup who have taste for good design</span>
          <span className="year col-span-4 lg:col-span-2 pl-2">Mano Andriasat</span>
        </div>
      </div>

      <div ref={mainRef} className="main min-h-[100vh] bg-[#f9f9f9]">
        <div className="about">
          <ModifHr left={10} text={"Get to know me better."} right={80} color={'black'} />
          <div className="about-details px-[5%] text-[#1c1b19]">
            <h1 ref={aboutTitleRef} className='about-title text-[4em] lg:text-[6em] text-weight-[bold]'>About.</h1>
            <p ref={textRef} className='about-reveal text-[2.5em] lg:text-[5em] leading-none'>My full name is Andriasatarintsoa Manohisoa, I am 21 years old and I live in Antananarivo, Madagascar. Since 2021, I have been pursuing my studies at IT University Andoharanofotsy, where I specialize in application development.</p>
          </div>
          <div className="marquee mt-10">
            <ModifMarquee />
          </div>
        </div>
      </div>


      <div className="bg-[#1c1b19] work z-10 min-h-screen">
        <ModifHr left={10} text={"Some of my work that might interest you."} right={75} color={'#f9f9f9'} />
        <div>
          <h1 className='about-title text-[4em] lg:text-[6em] text-weight-[bold] text-[#f9f9f9] px-[5%] pb-20 leading-none'>Personal Work.</h1>
          {Cards.map((card, index) => (
            <div key={index} className={`work-details work-${index} flex items-center`}>
              <div className='ml-5 p-5 lg:p-10'>
                <a href={`${card.link}`} target='blank' className='text-decoration-[none] text-[20px] lg:text-[25px]'> <FaExternalLinkAlt /></a>
              </div>
              <div>
                <h1 className={`work-title work-title-${index} text-[25px] lg:text-[40px]`}>{card.title}</h1>
                <div className={`work-content work-content-${index} text-[18px] lg:text-[30px] gap-5 p-5`}>
                  <p>{card.description}</p>
                  <ul>
                    <li>
                      <strong>Participants:</strong> {card.participants}
                    </li>
                    <li>
                      <strong>Technologies:</strong> {card.techno}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
          <div key={Cards.length} className={`work-details work-${Cards.length} flex items-center`}></div>
        </div>
      </div>

      <div className="h-[45vh] lg:h-[60vh] bg-[#1c1b19] text-[#f9f9f9]">
        <ModifHr left={10} text={"May be you wonder what am I."} right={75} color={'#f9f9f9'} />
        <SuperposedMarquee text='Who am I ?' background='May be you wonder who am I.' />
      </div>

      <div className="profesionnal-work bg-[#1c1b19] text-[#1c1b19]">
        <ModifHr left={10} text={"My skills that could be useful to you."} right={76} color={'black'} />
        <div className="skills w-full">
          {skillsData.map((skill, index) => (
            <div
              key={index}
              className="skill h-content lg:h-[60vh] p-5 lg:p-10"
              style={{ backgroundColor: skill.bgColor }}
            >
              <p className='text-[30px] lg:text-[6em] text-[#1c1b19] font-extrabold uppercase py-5'>
                {skill.title}
              </p>
              <h1 className="leading-none text-[25px] lg:text-[40px]">
                {skill.description}
              </h1>
              <div className="text-[18px] lg:text-[30px]">
                <ul className='language inline-flex gap-5 py-10 flex-wrap'>
                  {skill.languages.map((lang, i) => (
                    <li key={i}>{lang}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div ref={contact} className="h-[45vh] lg:h-[60vh] bg-[#1c1b19] text-[#f9f9f9]">
        <ModifHr left={10} text={"How you can contact me."} right={80} color={'#f9f9f9'} />
        <SuperposedMarquee text='Contact' background='Get in touch with me.' />
      </div>

      <div ref={contactInformation} className="contact-information h-0 border-none">
        <footer className="bg-[#f9f9f9] text-[#1c1b19] border-none">
          <div className='flex justify-between items-center border-none'>
            <div className="left bg-[#1c1b19] p-[20px]  border-none rounded-br-[20px]"></div>
            <div className="right bg-[#1c1b19] p-[20px] border-none rounded-bl-[20px]"></div>
          </div>
          <div className='py-[3%]'>
            <div className='flex justify-between items-center'>
              <div className="pl-[5%]">
                <p className='font-extrabold text-[18px] lg:text-[6em]'>Mano.</p>
                <p className='font-bold text-[18px]'>© 2025.</p>
              </div>
              <div className='pr-[5%]'>
                <ul className='text-[18px] lg:text-[40px] inline-flex gap-5'>
                  <li><a href="https://www.facebook.com/mano.andriasat"><FaSquareFacebook /></a></li>
                  <li><a href="https://www.linkedin.com/in/manohisoa-andriasatarintsoa-5894a1304/"> <FaLinkedin /></a></li>
                  <li><a href="https://github.com/ManoAndriasat"><FaSquareGithub /></a></li>
                </ul>
                <ul className='flex gap-5'>
                  <li>
                    <a href="mailto:ma.andriasat@gmail.com" className="font-bold">0343373351</a>
                  </li>
                </ul>
                <ul className='flex gap-5'>
                  <li>
                    <a href="mailto:ma.andriasat@gmail.com" className="font-bold">ma.andriasat@gmail.com</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}