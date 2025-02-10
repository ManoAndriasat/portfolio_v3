// "use client";

// import React , {use, useRef} from 'react'
// import '../style/work.css'
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { useGSAP } from '@gsap/react';


// gsap.registerPlugin(useGSAP);
// gsap.registerPlugin(ScrollTrigger);

// const Card = ({ title, description, image, participants, techno, index }) => {
//     return (
//         <div className="card" id={`card-${index + 1}`}>
//             <div className="card-inner">
//                 <div className="card-content">
//                     <h1>{title}</h1>
//                     <p>{description}</p>
//                     <ul>
//                         <li>
//                             <strong>Participants:</strong> {participants}
//                         </li>
//                         <li>
//                             <strong>Technologies:</strong> {techno.join(', ')}
//                         </li>
//                     </ul>
//                 </div>
//                 <div className="card-img">
//                     <img src={image} alt={title} />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default function Work(){
//     const Cards = [
//         {
//             title: 'Brand Identity',
//             description: 'We create a visual identity for your brand that is unique and memorable.',
//             image: 'https://assets.website-files.com/6384f0dcd0a815701796cd36/63858ae4d127c32babe6f55f_ezgif.com-gif-maker.jpg',
//             participants: 1,
//             techno: ['C#', 'React', 'Node.js']
//         },
//         {
//             title: 'Web Design',
//             description: 'We design and develop websites that are user-friendly and visually appealing.',
//             image: 'https://assets.website-files.com/6384f0dcd0a815701796cd36/6385f15ca596aa177d81cea8_the-hulk-scaled.jpeg',
//             participants: 2,
//             techno: ['C#', 'React', 'Node.js']
//         },
//         {
//             title: 'App Development',
//             description: 'We develop mobile apps that are fast, reliable, and easy to use.',
//             image: 'https://assets.website-files.com/6384f0dcd0a815701796cd36/63858ae4d127c32babe6f55f_ezgif.com-gif-maker.jpg',
//             participants: 3,
//             techno: ['C#', 'React', 'Node.js']
//         },
//         {
//             title: 'Digital Marketing',
//             description: 'We help you reach your target audience and grow your business online.',
//             image: 'https://assets.website-files.com/6384f0dcd0a815701796cd36/6385f15ca596aa177d81cea8_the-hulk-scaled.jpeg',
//             participants: 4,
//             techno: ['C#', 'React', 'Node.js']
//         }
//     ]

//     const container = useRef();

//     useGSAP(
//         () => {
//         const cards = gsap.utils.toArray('.card');

//         ScrollTrigger.create({
//             trigger: cards[0],
//             start: "top 35%",
//             endTrigger: cards[cards.length - 1],
//             end: "top 30%",
//             pin: ".intro",
//             pinSpacing: false
//         });

//         cards.forEach((card, index) => {
//             const isLastCard = index === cards.length - 1;
//             const cardInner = card.querySelector('.card-inner');

//             if(!isLastCard){
//                 ScrollTrigger.create({
//                     trigger: card,
//                     start: "top 35%",
//                     endTrigger: '.outro',
//                     end: "top 65%",
//                     pin: true,
//                     pinSpacing: false,
//                 });

//                 gsap.to(cardInner, {
//                     y: `-${(card.lenght - index) * 14}vh`,
//                     ease: 'none',
//                     scrollTrigger: {
//                         trigger: card,
//                         start: "top 35%",
//                         endTrigger: '.outro',
//                         end: "top 65%",
//                         scrub: true,
//                     },
//                 });
//             }
//         });

//         return () => {
//             ScrollTrigger.getAll().forEach(t => t.kill());
//         };

//     }, {scope: container});


//     return (
//         <div className="app" ref={container}>
//             <section className="intro"></section>
//             <section className="cards">
//                 {Cards.map((card, index) => (
//                     <Card key={index} {...card} index={index} />
//                 ))}
//             </section>
//             <section className="outro"></section>
//         </div>
//     )   
// }