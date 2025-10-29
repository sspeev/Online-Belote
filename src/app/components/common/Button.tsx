import { type FC } from 'react';
import LiquidGlass from '@nkzw/liquid-glass';

type ButtonProps = {
    icon?: string
    iconLight?: string
    text?: string
    additionalStyles?: string,
    borderRadius?: number
    onClick?: () => void
}

const Button: FC<ButtonProps> = ({
    icon,
    iconLight,
    additionalStyles,
    text,
    borderRadius,
    onClick
}) => {
    return (
        <LiquidGlass
            aberrationIntensity={2}
            blurAmount={0.1}
            borderRadius={borderRadius || 100}
            displacementScale={64}
            elasticity={0.35}
            onClick={onClick}
            padding="1px 27px"
            saturation={130}
            className={additionalStyles}
        >
            <div className="flex flex-col justify-center items-center">
                <img className="visible dark:invisible relative dark:absolute  w-5 h-5" src={icon} alt="Icon" />
                <img className="invisible dark:visible absolute dark:relative  w-5 h-5" src={iconLight} alt="Icon Light" />
                <span className="text-text-dark dark:text-text-light text-sm lg:text-xl lg:font-medium font-default">{text}</span>
            </div>
        </LiquidGlass>
    );
}

export default Button;