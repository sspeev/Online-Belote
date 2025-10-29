import { type FC } from "react";
import Button from "../common/Button";
import plus from "../../../assets/svgs/Plus.svg";
import arrows from "../../../assets/svgs/Chevrons right.svg";
import Moon from "../../../assets/svgs/Moon.svg";
import User from "../../../assets/svgs/User.svg";
import imageDesktop from "../../../assets/common/HeroDesktop.png";
import imageMobile from "../../../assets/common/HeroMobile.jpg";

const LandingPage: FC = () => {

    return (
        <div className="h-screen relative">
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
            <section className="flex flex-row gap-20 absolute top-10 right-10 z-10 h-10">
                <Button icon={Moon} text="" />
                <Button icon={User} />
            </section>
            <div className="absolute top-px left-0 w-screen h-screen rotate-180"
                style={{ backgroundImage: 'linear-gradient(90deg, rgba(171,168,153,1) 24%, rgba(153,150,134,0.54) 65%)' }} />
            <section className="text-center absolute top-70 left-40 lg:top-70 lg:left-30 flex flex-col gap-10 lg:gap-20 justify-center items-center">
                <h2 className="text-text-light dark:text-text-dark font-default text-2xl lg:text-5xl font-semibold">Play online Belote with friends</h2>
                <section className="flex flex-row lg:flex-row relative left-20 lg:left-60 w-full h-full gap-25 lg:gap-50">
                    <Button icon={plus} additionalStyles="liquidGlassBtn" text="Create" />
                    <Button icon={arrows} additionalStyles="liquidGlassBtn" text="Join" />
                </section>
            </section>
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