'use client';
import './style/style.css';
import React, { useRef, useEffect } from 'react';
import { FaExternalLinkAlt, FaLinkedin, FaArrowRight } from 'react-icons/fa';
import { FaSquareFacebook, FaSquareGithub } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { gsap } from 'gsap';
import 'tailwindcss/tailwind.css';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ModifMarquee from "./components/Marquee";
import { Cards, skillsData } from './data';
import ModifHr from './components/ModifHr';
import SuperposedMarquee from './components/SuperposedMarquee';
import SecondHeader from './components/SecondHeader';
import FirstHeader from './components/FirstHeader';
import { useGSAP } from "@gsap/react";
import SplitType from 'split-type';

export default function Home() {

  const textRef = useRef(null);
  const annonceRef = useRef(null);
  const aboutTitleRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const landingRef = useRef(null);
  const miniBannerRef = useRef(null);
  const rightArrowRight = useRef(null);
  const workRef = useRef(null);
  const skillsRef = useRef(null);
  const workTitleRef = useRef(null);


  // ARROW ANIMATION
  useEffect(() => {
    if (rightArrowRight.current) {
      gsap.to(rightArrowRight.current, {
        x: 10,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }
  }, []);


  // TEXT APPEAR AND SPLIT
  useEffect(() => {
    const myText = new SplitType(".my-text", { types: 'words, chars' });
    gsap.to(myText.chars, {
      y: 0,
      delay: 0.2,
      duration: 0.2,
      ease: 'power1.inOut',
    });

    if (textRef.current) {
      const results = new SplitType(textRef.current, { types: 'words, chars' });
      gsap.from(results.chars, {
        opacity: 0.1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: aboutRef.current,
          start: '-10 70%',
          end: 'bottom bottom',
          scrub: true,
        },
      });
    }

    if (miniBannerRef.current) {
      const results = new SplitType(miniBannerRef.current, { types: 'words, chars' });
      gsap.from(results.chars, {
        opacity: 0,
        stagger: 0.05,
        duration: 0.5,
        scrollTrigger: {
          trigger: landingRef.current,
          start: 'top 50%',
          end: 'bottom bottom',
        },
      });
    }
  }, []);


  // BASIC SCROLL TRIGGER
  useEffect(() => {
    // LENIS
    import('@studio-freight/lenis').then((LenisModule) => {
      const Lenis = LenisModule.default;
      const lenis = new Lenis({
        duration: 0.9,
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


  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (annonceRef.current) {
      gsap.from(annonceRef.current, {
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: aboutRef.current,
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
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 70%',
          end: 'top 50%',
          scrub: true,
          ease: 'power1.inOut',
        },
      });
    }

    if (workTitleRef.current) {
      gsap.from(workTitleRef.current, {
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: workRef.current,
          start: 'top 70%',
          end: 'top 50%',
          scrub: true,
          ease: 'power1.inOut',
        },
      });
    }

    const tl = gsap.timeline({
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

    tl.to(aboutRef.current, {
      y: '0vh',
      duration: 1,
    }, 0);

    tl.to(landingRef.current, {
      y: '-10vh',
      duration: 1,
    }, 0);

    //Stacking skills
    const skills = gsap.utils.toArray(".skill");
    const isMobile = window.innerWidth < 768;
    const spacer = isMobile ? 80 : 190;
    const duration = isMobile ? 180 : 320;

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

    //Work details extension
    document.querySelectorAll(".work-details").forEach((work, index) => {
      const workContent = work.querySelector(".work-content");
      const workTitle = work.querySelector(`.work-title-${index}`);
      const workLink = work.querySelector(`.work-link`);
      const contentHeight = workContent?.offsetHeight || 0;

      ScrollTrigger.create({
        trigger: work,
        start: `top-=${contentHeight * index} 35%`,
        end: `bottom-=${contentHeight * (index + 1)} 35%`,
        onToggle: (self) => {
          if (self.isActive) {
            gsap.set([workContent], { opacity: 1, display: "block" });
            gsap.set([work, workTitle, workLink], { backgroundColor: "#f9f9f9", color: "#1c1b19" });
          } else {
            gsap.set([workContent], { opacity: 0, display: "none" });
            gsap.set([work, workTitle, workLink], { backgroundColor: "#1c1b19", color: "#f9f9f9" });
          }
        },
      });
    });
  }, []);



  return (
    <>
      <SecondHeader landingRef={landingRef} aboutRef={aboutRef} workRef={workRef} skillsRef={skillsRef} contactRef={contactRef} />
      <section id='landing' ref={landingRef} className='landing text-[#f9f9f9] h-screen' >
        <FirstHeader landingRef={landingRef} aboutRef={aboutRef} workRef={workRef} skillsRef={skillsRef} contactRef={contactRef} />
        <div className="simple-word lg:pl-[35%] lg:pr-[15%] mt-[15%] lg:mt-0 mx-5 lg:mx-0">
          <p className="leading-none text-[3em] lg:text-[6em]">
            {`THINGS THAT YOU ARE NOT PROUD OF SHOULDN'T BE SIGNED BY YOUR NAME.`
              .split(" ")
              .map((word, index) => (
                <span key={index} className="inline-block my-text whitespace-pre-wrap">
                  {word + " "}
                </span>
              ))}
          </p>
          <p ref={miniBannerRef} className='font-sans mini-banner'>Show your worth through your work.</p>
        </div>

        <div className="foot grid grid-cols-12">
          <span className='pl-0 lg:pl-2 word col-span-8 lg:col-span-10 pr-2'>A developer who builds with design in mind.</span>
          <span className="year col-span-4 lg:col-span-2 pl-2">Mano Andriasat</span>
        </div>
      </section>

      <section id='about' ref={aboutRef} className="main min-h-[100vh] bg-[#f9f9f9]">
        <div className="about">
          <ModifHr left={10} text={"Get to know me better."} right={80} color={'black'} />
          <div className="about-details px-[5%] text-[#1c1b19]">
            <h1 ref={aboutTitleRef} className='text-[4em] lg:text-[6em] text-weight-[bold]'>About.</h1>
            <p ref={textRef} className='about-reveal text-[2.1em] lg:text-[4em] leading-none'>
              I&apos;m Andriasatarintsoa Manohisoa, 21 years old, living in Antananarivo, Madagascar. I&apos;ve been studying application development at IT
              University Andoharanofotsy since 2021. I enjoy working on projects that help me learn more about coding, problem-solving,
              and design. I also like solving problems on LeetCode to improve my skills in algorithms and logic. Below are some of the projects I&apos;ve worked on.</p>
          </div>
          <div className="marquee mt-10 mb-5 lg:mb-0">
            <ModifMarquee />
          </div>
        </div>
      </section>

      <section id='work' ref={workRef} className="bg-[#1c1b19] work z-10 min-h-screen">
        <ModifHr left={10} text={"Some of my work that might interest you."} right={75} color={'#f9f9f9'} />
        <div>
          <h1 ref={workTitleRef} className='text-[4em] lg:text-[6em] text-weight-[bold] text-[#f9f9f9] px-[5%] pb-10 pt-10 lg:pt-0 leading-none'>Work.</h1>
          {Cards.map((card, index) => (
            <div key={index} className={`work-details work-${index} flex items-center justify-between`}>
              <div>
                <p className={`work-title work-title-${index} text-[25px] lg:text-[40px] py-[10px] lg:py-[30px]`}>{card.title}</p>
                <div className={`work-content work-content-${index} text-[18px] gap-5 p-5`}>
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
              <div className='ml-5 p-5 lg:p-10 work-link text-white'>
                <a href={`${card.link}`} target='blank' className='text-decoration-[none] text-[20px] lg:text-[25px]'> <FaExternalLinkAlt /></a>
              </div>
            </div>
          ))}
          <div key={Cards.length} className={`work-details work-${Cards.length} flex items-center`}></div>
        </div>
      </section>

      <div className="h-[45vh] lg:h-[60vh] bg-[#1c1b19] text-[#f9f9f9] mt-[20px] lg:mt-0">
        <ModifHr left={10} text={"May be you wonder what am I."} right={75} color={'#f9f9f9'} />
        <SuperposedMarquee text='Who am I ?' background='May be you wonder who am I.' />
      </div>

      <section id='skills' ref={skillsRef} className="profesionnal-work bg-[#1c1b19] text-[#1c1b19]">
        <ModifHr left={10} text={"My skills that could be useful to you."} right={76} color={'black'} />
        <div className="skills w-full">
          {skillsData.map((skill, index) => (
            <div
              key={index}
              className="skill h-content lg:h-[60vh] p-5 lg:px-10"
              style={{ backgroundColor: skill.bgColor }}
            >
              <p className='skill-title text-[30px] lg:text-[6em] text-[#1c1b19] font-extrabold uppercase pb-5 lg:pb-7'>
                {skill.title}
              </p>
              <p className="skill-description leading-none text-[18px] lg:text-[30px]">
                {skill.description}
              </p>
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
      </section>

      <div id='contact' ref={contactRef} className="h-[45vh] lg:h-[60vh] bg-[#1c1b19] text-[#f9f9f9] mt-10">
        <ModifHr left={10} text={"How you can contact me."} right={80} color={'#f9f9f9'} />
        <SuperposedMarquee text='Contact me' background='Get in touch with me.' />
      </div>

      <footer className="hidden lg:block bg-[#f9f9f9] text-[#1c1b19] border-none">
        <div className='flex justify-between items-center border-none'>
          <div className="left bg-[#1c1b19] p-[20px] lg:p-[30px]  border-none rounded-br-[20px]"></div>
          <ul className='text-[25px] lg:text-[40px] inline-flex gap-5'>
            <li><a href="https://www.facebook.com/mano.andriasat"><FaSquareFacebook /></a></li>
            <li><a href="https://www.linkedin.com/in/manohisoa-andriasatarintsoa-5894a1304/"> <FaLinkedin /></a></li>
            <li><a href="https://github.com/ManoAndriasat"><FaSquareGithub /></a></li>
          </ul>
          <div className="right bg-[#1c1b19] p-[20px] lg:p-[30px] border-none rounded-bl-[20px]"></div>
        </div>
        <div className='p-5'>
        </div>
        <div className='py-[3%]'>
          <div className='flex justify-between items-center'>
            <div className="pl-[5%]">
              <p className='font-extrabold text-[18px] lg:text-[5em]'>Mano.</p>
              <p className='font-bold text-[18px]'>© 2025.</p>
            </div>
            <div className='pr-[5%] text-right flex flex-col items-end'>
              <ul className='flex gap-5 text-[18px] lg:text-[30px] justify-end'>
                <li>
                  <a href="mailto:ma.andriasat@gmail.com" className="font-bold">+261 33 733 51</a>
                </li>
              </ul>
              <ul className='inline-flex items-center gap-5 text-[18px] lg:text-[30px] justify-end'>
                <li className='mt-1'>
                  <FaArrowRight ref={rightArrowRight} />
                </li>
                <li>
                  <a href="mailto:ma.andriasat@gmail.com" className="font-bold underline-custom">ma.andriasat@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>
          <div className='p-5'>
          </div>
        </div>
      </footer>

      <footer className="block lg:hidden text-[#1c1b19] border-none">
        <div className='flex justify-center items-center border-none p-5 bg-[#f9f9f9]'>
          <ul className='text-[30px] inline-flex gap-5'>
            <li><a href="https://www.facebook.com/mano.andriasat"><FaSquareFacebook /></a></li>
            <li><a href="https://www.linkedin.com/in/manohisoa-andriasatarintsoa-5894a1304/"> <FaLinkedin /></a></li>
            <li><a href="https://github.com/ManoAndriasat"><FaSquareGithub /></a></li>
            <li><a href="mailto:ma.andriasat@gmail.com"><SiGmail /></a></li>
          </ul>
        </div>
      </footer>
    </>
  );
}