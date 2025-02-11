'use client';
import React from 'react';
import { BsFillSuitSpadeFill } from "react-icons/bs";
import Marquee from "react-fast-marquee";

export default function ModifMarquee() {
    return(
        <div className='lg:mt-0 p-[5%]'>
            <Marquee gradient={false} speed={50}>
                {[...Array(10)].map((_, index) => (
                    <React.Fragment key={index}>
                    <p className='marquee text-[#1c1b19] inline-flex items-center'>
                        creative{' '}
                        <span className="bg-[#1c1b19] text-white p-3 ml-2 rounded-lg">developer</span>{' '}
                        <span className="mx-10">
                        <BsFillSuitSpadeFill className="text-3xl text-[#1c1b19]" />
                        </span>
                    </p>
                    </React.Fragment>
                ))}
            </Marquee>
        </div>
    )
}
