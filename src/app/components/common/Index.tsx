import gsap from 'gsap'
//import { useGSAP } from "@gsap/react";
import { SplitText } from 'gsap/SplitText'
import Button from '../common/Button'
import plus from '../../../assets/svgs/Plus.svg'
import plusLight from '../../../assets/svgs/PlusLight.svg'
import arrows from '../../../assets/svgs/Chevrons right.svg'
import arrowsLight from '../../../assets/svgs/Chevrons rightLight.svg'
import { Background } from './Background'
import type { FC } from 'react'
import { BtnShape } from '@/types/enums/btnShape'

gsap.registerPlugin(SplitText)

const LandingPage: FC = () => {
  // useGSAP(() : void => {
  //     const belote = new SplitText(".heading", { type: "chars" });
  //
  //     belote.chars.forEach(char => {
  //         gsap.set(char, {
  //             backgroundColor: 'white',
  //             backgroundClip: 'text',
  //             WebkitBackgroundClip: 'text',
  //             color: 'transparent',
  //             display: 'inline-block'
  //         });
  //     });
  //
  //     gsap.from(belote.chars, {
  //         yPercent: 100,
  //         duration: 1,
  //         ease: "fade.in",
  //         stagger: 0.05
  //     });
  // })

  return (
    <div className="h-screen relative overflow-hidden">
      <Background blur={false} buttons={true} />
      <section className="text-center absolute top-70 left-0 lg:top-70 lg:left-30 w-sm lg:w-2xl flex flex-col gap-10 lg:gap-20 justify-center items-center">
        <section>
          <h2 className="heading text-text-dark dark:text-text-light font-default text-2xl lg:text-5xl font-semibold">
            Play online Belote
          </h2>
          <h2 className="heading text-text-dark dark:text-text-light font-default text-2xl lg:text-5xl font-semibold">
            with friends
          </h2>
        </section>
        <section className="flex flex-row lg:flex-row relative left-40 lg:left-60 w-full h-full gap-25 lg:gap-50 z-10">
          <Button
            path="/create"
            icon={plus}
            iconLight={plusLight}
            shape={BtnShape.MAIN}
            text="Create"
            liquid={true}
          />
          <Button
            path="/join"
            icon={arrows}
            iconLight={arrowsLight}
            shape={BtnShape.MAIN}
            text="Join"
            liquid={true}
          />
        </section>
      </section>
      <div className="absolute inset-0 rotate-180 " />
    </div>
  )
}

export default LandingPage
