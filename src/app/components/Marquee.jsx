'use client';
import React from 'react';
import { BsFillSuitSpadeFill } from "react-icons/bs";
import Marquee from "react-fast-marquee";

export default function ModifMarquee() {
    return(
        <div className='lg:mt-0 px-[5%] py-[5%] lg:py-[10%]'>
            <Marquee gradient={false} speed={50}>
                {[...Array(10)].map((_, index) => (
                    <React.Fragment key={index}>
                    <p className='marquee text-black inline-flex items-center'>
                        creative{' '}
                        <span className="bg-black text-white p-3 ml-2 rounded-lg">developer</span>{' '}
                        <span className="mx-10">
                        <BsFillSuitSpadeFill className="text-3xl text-black" />
                        </span>
                    </p>
                    </React.Fragment>
                ))}
            </Marquee>
        </div>
    )
}
