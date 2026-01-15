import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../common/Button";
import plus from "../../../assets/svgs/Plus.svg";
import plusLight from "../../../assets/svgs/PlusLight.svg";
import arrows from "../../../assets/svgs/Chevrons right.svg";
import arrowsLight from "../../../assets/svgs/Chevrons rightLight.svg";
import Moon from '../../../assets/svgs/Moon.svg';
import MoonLight from '../../../assets/svgs/MoonLight.svg';
import User from '../../../assets/svgs/User.svg';
import UserLight from '../../../assets/svgs/UserLight.svg';
import type {FC} from 'react';
import { BtnShape } from "@/types/enums/btnShape";

gsap.registerPlugin(ScrollTrigger);

const LandingPage: FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    useGSAP(() => {
        if (!videoRef.current || !containerRef.current) return;

        const video = videoRef.current;

        // Ensure video metadata is loaded for duration
        if (!isVideoLoaded) return;

        // Create a timeline linked to scroll
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=3000", // Scroll distance
                scrub: 1, // Smooth scrubbing
                pin: true, // Pin the container while scrolling
            }
        });

        // 1. Animate video time based on scroll
        const videoDuration = video.duration || 10;
        
        // Ensure video is paused so it doesn't play automatically
        video.pause();

        // Normalize the timeline to 1 second duration
        // The scrollTrigger scrubs this 1 second timeline over the 'end' distance (+3000px)
        tl.fromTo(video, 
            { currentTime: 0 }, 
            { currentTime: videoDuration, duration: 1, ease: "none" },
            0 
        );

        // 2. Text animation: Fade out smoothly in the first 20% of scroll
        tl.to(textRef.current, {
            opacity: 0,
            y: -100,
            duration: 0.4, // relative to timeline duration of 2
            ease: "power2.in"
        }, 0);

        // 3. Reveal CTA buttons at the very end (start at 90%)
        tl.fromTo(buttonsRef.current, 
            { autoAlpha: 0, scale: 0.8 },
            { autoAlpha: 1, scale: 1, duration: 0.1, ease: "back.out(1.7)" },
            0.9 // Start at 90% of the timeline
        );

    }, { scope: containerRef, dependencies: [isVideoLoaded] });

    return (
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black"> 
            
            {/* Background Video */}
            <video 
                ref={videoRef}
                className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
                src="/output.mp4"
                muted
                playsInline
                preload="auto"
                onLoadedMetadata={() => setIsVideoLoaded(true)}
            />

            {/* Top Right Buttons (Theme/User) */}
            <div className="absolute top-6 right-6 lg:top-10 lg:right-10 z-50 flex flex-col gap-4">
                 <Button
                    liquid={true}
                    path="/settings" 
                    icon={Moon}
                    iconLight={MoonLight}
                    shape={BtnShape.CIRCULAR}
                />
                <Button
                    liquid={true}
                    path="/profile"
                    icon={User}
                    iconLight={UserLight}
                    shape={BtnShape.CIRCULAR}
                />
            </div>

            {/* Initial Text Content */}
            <div ref={textRef} className="absolute inset-0 flex flex-col items-center justify-center gap-6 text-center px-4 z-10 pointer-events-none">
                <h1 className="text-white font-default text-5xl lg:text-8xl font-bold tracking-tight drop-shadow-2xl">
                    Play Online Belote
                </h1>
                <h2 className="text-white/90 font-default text-3xl lg:text-6xl font-medium tracking-wide drop-shadow-xl">
                    with friends
                </h2>
                <div className="mt-12 text-white/70 animate-bounce">
                    <p className="text-sm lg:text-base uppercase tracking-[0.3em]">Scroll to Explore</p>
                </div>
            </div>

            {/* Final CTA Buttons (Create/Join) - Fixed Center - Initially Hidden */}
            <div ref={buttonsRef} className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center gap-12 z-20 opacity-0 invisible"> 
                 <Button path="/create" icon={plus} iconLight={plusLight} shape={BtnShape.MAIN} text="Create" liquid={true} />
                 <Button path="/join" icon={arrows} iconLight={arrowsLight} shape={BtnShape.MAIN} text="Join" liquid={true} />
            </div>

        </div>
    );
};

export default LandingPage;