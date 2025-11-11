import { useContext, type FC } from "react";
import Button from "../common/Button";
import plus from "../../../assets/svgs/Plus.svg";
import plusLight from "../../../assets/svgs/PlusLight.svg";
import arrows from "../../../assets/svgs/Chevrons right.svg";
import arrowsLight from "../../../assets/svgs/Chevrons rightLight.svg";
import Moon from "../../../assets/svgs/Moon.svg";
import MoonLight from "../../../assets/svgs/MoonLight.svg";
import User from "../../../assets/svgs/User.svg";
import UserLight from "../../../assets/svgs/UserLight.svg";
import imageDesktop from "../../../assets/common/HeroDesktop.png";
import imageMobile from "../../../assets/common/HeroMobile.jpg";
//import LiquidGlass from '@nkzw/liquid-glass';
import { BtnShape } from "@/types/enums/btnShape";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
//import { useLobby } from "@/hooks/useLobby";

gsap.registerPlugin(SplitText)

const LandingPage: FC = () => {

    const state = useLobby();

    useGSAP(() => {
        const belote = new SplitText(".heading", { type: "chars" });

        // Apply gradient to each individual character of the Belote text
        belote.chars.forEach(char => {
            gsap.set(char, {
                backgroundColor: 'white',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                display: 'inline-block'
            });
        });

        gsap.from(belote.chars, {
            yPercent: 100,
            duration: 1,
            ease: "fade.in",
            stagger: 0.05
        });
    })

    return (
        <div className="h-screen relative overflow-hidden">
            <img
                className="visible h-screen relative overflow-hidden"
                alt="Image"
                src={imageDesktop}
            />
            <img
                className="visible lg:invisible h-screen absolute top-0 left-0 overflow-hidden"
                alt="Image"
                src={imageMobile}
            />
            <section className="flex flex-col justify-end gap-20 absolute top-10 left-[90%] lg:left-[97%] z-10 w-13  h-20">
                <Button icon={Moon} iconLight={MoonLight} shape={BtnShape.CIRCULAR} onClick={() => {}} />
                <Button icon={User} iconLight={UserLight} shape={BtnShape.CIRCULAR} onClick={() => {}} />
            </section>

            <div className="visible dark:invisible absolute top-px left-0 w-screen h-screen rotate-180 background " />
            <div className="invisible dark:visible absolute top-px left-0 w-screen h-screen rotate-180 background-dark" />

            <section className="text-center absolute top-70 left-0 lg:top-70 lg:left-30 w-sm lg:w-2xl flex flex-col gap-10 lg:gap-20 justify-center items-center">
                <section>
                    <h2 className="heading text-text-dark dark:text-text-light font-default text-2xl lg:text-5xl font-semibold">Play online Belote</h2>
                    <h2 className="heading text-text-dark dark:text-text-light font-default text-2xl lg:text-5xl font-semibold">with friends</h2>
                </section>
                <section className="flex flex-row lg:flex-row relative left-40 lg:left-60 w-full h-full gap-25 lg:gap-50 z-10">
                    <Button icon={plus} iconLight={plusLight} shape={BtnShape.MAIN} text="Create" />
                    <Button icon={arrows} iconLight={arrowsLight} shape={BtnShape.MAIN} text="Join" />
                </section>
            </section>
            <div className="absolute inset-0 rotate-180 " />
        </div>
    );
};

export default LandingPage;