import { useRef, type FC } from "react";
//import Moon from "../../../assets/Moon.svg";
//import User from "../../../assets/User.svg"
//import { TabBarButtonIpad } from "./TabBarButtonIpad";
import imageDesktop from "../../../assets/Hero.png";
import LiquidGlass from 'liquid-glass-react';

const LandingPage: FC = () => {

    const container1 = useRef<HTMLDivElement>(null);
    return (
        <div className="h-screen relative overflow-hidden">
            <img
                className="invisible lg:visible h-screen relative overflow-hidden"
                alt="Image"
                src={imageDesktop}
            />
            <div className="absolute top-px left-0 w-screen h-screen rotate-[179.86deg]"
                style={{ backgroundImage: 'linear-gradient(90deg, rgba(171,168,153,1) 24%, rgba(153,150,134,0.54) 65%)' }} />
            <h2 className="absolute text-text-light dark:text-text-dark top-[50%] left-[10%] transform font-default text-2xl lg:text-5xl font-semibold">Play online Belote with friends</h2>
            <LiquidGlass
                className="h-[67px] flex absolute left-[284px] w-[166px] top-[635px]"
                mouseContainer={container1}
                elasticity={0.3}
            >
                <span>Create</span>
            </LiquidGlass>
            <LiquidGlass
                className="h-[67px] flex absolute left-[590px] w-[166px] top-[635px]"
                mouseContainer={container1}
                elasticity={0.3}
            >
                <span>Join</span>
            </LiquidGlass>
            {/* <div
                className="flex w-[659px] items-start p-1 absolute top-6 left-[683px]"
                data-colors-mode="light"
            >
                <LiquidGlassRegular
                    blur="blur-4.svg"
                    blurClassName="!left-[-26px] !-top-6"
                    className="!h-full !absolute !left-0 !w-full !top-0"
                    mode="light"
                    state="default"
                />
                <div className="flex h-9 items-center justify-center relative flex-1 grow">
                    <TabBarButtonIpad
                        className="!flex-[0_0_auto] !left-[unset] !top-[unset]"
                        label="About"
                        mode="light"
                        selected
                    />
                    <TabBarButtonIpad
                        className="!left-[unset] !flex-1 !flex !grow !top-[unset]"
                        label="Label"
                        mode="light"
                        selected={false}
                    />
                    <TabBarButtonIpad
                        className="!left-[unset] !flex-1 !flex !grow !top-[unset]"
                        label="Label"
                        mode="light"
                        selected={false}
                    />
                </div>
            </div>
            <div className="absolute top-[19px] left-[1831px] w-[63px] h-[63px]">
                <LiquidGlassRegular
                    blur="blur-5.svg"
                    blurClassName="!left-[-26px] !top-[-19px]"
                    className="!h-[63px] !absolute !left-0 !w-[63px] !top-0"
                    mode="light"
                    state="default"
                />
                <User className="!absolute !top-[15px] !left-[15px] !w-8 !h-8" />
            </div>
            <div className="absolute top-[19px] left-[1761px] w-[63px] h-[63px]">
                <LiquidGlassRegular
                    blur="blur-6.svg"
                    blurClassName="!left-[-26px] !top-[-19px]"
                    className="!h-[63px] !absolute !left-0 !w-[63px] !top-0"
                    mode="light"
                    state="default"
                />
                <Moon className="!absolute !top-[15px] !left-4 !w-8 !h-8" />
            </div> */}
        </div>
    );
};

export default LandingPage;