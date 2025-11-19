import { type FC } from 'react';
import { BtnShape } from '@/types/enums/btnShape';
import LiquidGlass from '@nkzw/liquid-glass';
import { Link } from '@tanstack/react-router';

type ButtonProps = {
    path: string,
    icon?: string,
    iconLight?: string,
    text?: string,
    padding?: string,
    additionalStyles?: string,
    borderRadius?: number,
    shape?: BtnShape
    liquid: boolean
}

const Button: FC<ButtonProps> = ({
    path,
    icon,
    iconLight,
    additionalStyles,
    text,
    borderRadius,
    shape,
    liquid
}) => {

    const BtnComponent = liquid ?
        <LiquidGlass
            aberrationIntensity={2}
            blurAmount={0.1}
            borderRadius={borderRadius || 100}
            displacementScale={64}
            elasticity={0.35}
            padding={shape}
            saturation={130}
            className={additionalStyles}
        >
            <div className="flex flex-col justify-center items-center">
                <img className="visible dark:invisible relative dark:absolute  w-5 h-5" src={icon} alt="Icon" />
                <img className="invisible dark:visible absolute dark:relative  w-5 h-5" src={iconLight} alt="Icon Light" />
                <span className="text-text-dark dark:text-text-light text-sm lg:text-xl lg:font-medium font-default">{text}</span>
            </div>
        </LiquidGlass>
        :
        <button className={additionalStyles} style={{ borderRadius: borderRadius || 100, padding: shape }}>
            <div className="flex flex-col justify-center items-center">
                <img className="visible dark:invisible relative dark:absolute  w-5 h-5" src={icon} alt="Icon" />
                <img className="invisible dark:visible absolute dark:relative  w-5 h-5" src={iconLight} alt="Icon Light" />
                <span className="text-text-dark dark:text-text-light text-sm lg:text-xl lg:font-medium font-default">{text}</span>
            </div>
        </button>
    return (
        <Link to={path}>
            {BtnComponent}
        </Link>
    );
}

export default Button;