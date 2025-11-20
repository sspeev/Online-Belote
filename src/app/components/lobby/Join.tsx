//import { usePlayer } from "@/hooks/usePlayer";
import { useState, type FC } from "react";
import { Background } from "../common/Backgound";
import LiquidGlass from "@nkzw/liquid-glass";
import Button from "../common/Button";
import { BtnShape } from "@/types/enums/btnShape";
import plus from "../../../assets/svgs/plus.svg";
import plusLight from "../../../assets/svgs/PlusLight.svg";
import back from "../../../assets/svgs/Chevrons left.svg";
import backLight from "../../../assets/svgs/Chevrons leftLight.svg";

const JoinForm: FC = () => {

    //const playerState = usePlayer();

    const [playerName, setPlayerName] = useState<string>('');

    const handleJoinLobby = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    };

    return (
        <section className="create-container h-screen relative overflow-hidden">
            <Background />
            <div className="absolute top-70 left-1/2 lg:top-90 lg:left-1/2 flex flex-col gap-10 lg:gap-20 justify-center items-center">
                <LiquidGlass
                    borderRadius={40}>
                    <div className="flex flex-col w-full justify-center gap-5 py-20 px-0.5 lg:py-20 lg:px-10">
                        <h2 className="text-3xl">Join Lobby</h2>
                        <input type="text" placeholder="Player name" value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        className="border-white rounded-xl border-2 text-base py-1 px-2" />
                        <section className="flex flex-row justify-between px-10">
                            <Button submit={true} path="/waiting" text="Join" shape={BtnShape.MAIN} liquid={false} icon={plus} iconLight={plusLight} additionalStyles="border-2" />
                            <Button path="/" text="Back" shape={BtnShape.MAIN} liquid={false} icon={back} iconLight={backLight} additionalStyles="border-2" />
                        </section>
                    </div>
                </LiquidGlass>
            </div>
        </section>
    );
}

export default JoinForm;