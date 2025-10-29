import { type FC } from 'react';
import LiquidGlass from '@nkzw/liquid-glass';

type ButtonProps = {
    icon: string
    text: string
    additionalStyles: string
}

const Button: FC<ButtonProps> = ({
    icon,
    additionalStyles,
    text
}) => {
    return (
        <LiquidGlass
            aberrationIntensity={2}
            blurAmount={0.1}
            borderRadius={100}
            displacementScale={64}
            elasticity={0.35}
            onClick={() => console.log('Button clicked!')}
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