import { type FC } from 'react';
import LiquidGlass from '@nkzw/liquid-glass';

type ButtonProps = {
    icon?: string
    text?: string
    additionalStyles?: string,
    borderRadius?: number
    onClick?: () => void
}

const Button: FC<ButtonProps> = ({
    icon,
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
                <img className="w-5 h-5" src={icon} alt="Plus Icon" />
                <span className="text-text-light dark:text-text-dark text-sm lg:text-xl lg:font-medium font-default">{text}</span>
            </div>
        </LiquidGlass>
    );
}

export default Button;