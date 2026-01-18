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
        tl.fromTo(video, 
            { currentTime: 0 }, 
            { currentTime: videoDuration, duration: 1, ease: "none" },
            0 
        );

        // 2. Text animation: Fade out smoothly in the first 20% of scroll
        tl.to(textRef.current, {
            opacity: 0,
            y: -100,
            duration: 0.2, 
            ease: "power2.in"
        }, 0);

    }, { scope: containerRef, dependencies: [isVideoLoaded] });

    return (
        <div className="relative w-full">
            {/* Pinned Hero Section */}
            <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black z-10"> 
                
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

                {/* Video Gradients for Smooth Transition */}
                <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black to-transparent z-[5] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full h-80 bg-gradient-to-t from-black via-black/50 to-transparent z-[5] pointer-events-none" />

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
            </div>

            {/* Content Below (Main Dev Info / CTA) */}
            <div className="relative z-20 bg-black w-full min-h-[100vh] -mt-40 flex flex-row items-center justify-center py-20 gap-20">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-42"> 
                    <Button path="/create" icon={plus} iconLight={plusLight} shape={BtnShape.MAIN} text="Create" liquid={true} />
                    <Button path="/join" icon={arrows} iconLight={arrowsLight} shape={BtnShape.MAIN} text="Join" liquid={true} />
                </div>
                <section className="flex flex-col items-center justify-center gap-10 border-l-1 border-white pl-20">
                    <h2 className="text-white font-default text-xl lg:text-3xl font-medium tracking-wide drop-shadow-xl">Main dev: Stoyan Peev</h2>
                    <img src="/devIamge.jpg" alt="devImage" className="w-50 h-60 rounded-lg" />
                </section>
            </div>
        </div>
    );
};

export default LandingPage;