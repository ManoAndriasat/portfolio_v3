import Marquee from "react-fast-marquee";
import React from "react"; 

export default function SuperposedMarquee({text, background}) {
    return(
        <div className="relative flex justify-center items-center h-[30vh] w-full overflow-hidden">
          <div className="relative text-[30px] lg:text-[6em] text-[#f9f9f9] font-extrabold uppercase text-center leading-none">
           {text}
          </div>

          <div className="absolute inset-0 flex items-center">
            <Marquee gradient={false} speed={80} className="leading-none overflow-hidden">
              {[...Array(15)].map((_, index) => (
                <React.Fragment key={index}>
                  <p className="text-[200px] lg:text-[300px] text-[#55555581] uppercase mr-[50px] font-extrabold">
                    {background}
                  </p>
                </React.Fragment>
              ))}
            </Marquee>
          </div>
        </div>
    )
}