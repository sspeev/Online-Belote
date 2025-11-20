import { usePlayer } from "@/hooks/usePlayer";
import { useNavigate } from "@tanstack/react-router"; // 1. Import the hook

import { Background } from "../common/Backgound";
import Button from "../common/Button";
import { BtnShape } from "@/types/enums/btnShape";
import { type FC } from "react";
import back from "../../../assets/svgs/Chevrons left.svg";
import backLight from "../../../assets/svgs/Chevrons leftLight.svg";
import plus from "../../../assets/svgs/plus.svg";
import plusLight from "../../../assets/svgs/PlusLight.svg";

const CreateForm: FC = () => {

    const { state, dispatch } = usePlayer();
    const navigate = useNavigate();

    if (!state) return null; // Or a loading spinner

    const handleCreateLobby = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("Creating lobby with:", {
            playerName: state.player?.name,
            lobbyName: state.lobbyName
        });

        // --- API Call Logic Goes Here ---
        // const response = await lobbyApi.create({ ... });
        // const newLobbyId = response.data.id;
        //const newLobbyId = "12345"; // Mock ID for demonstration
        // --------------------------------

        //navigate({ to: '/lobby/waiting' });
    };

    return (
        <section className="create-container h-screen relative overflow-hidden">
            <Background />
            <div className="absolute inset-0 flex justify-center items-center p-4">
                <form
                    onSubmit={handleCreateLobby}
                    className="flex flex-col w-full max-w-sm gap-5 p-8 bg-black/20 rounded-3xl backdrop-blur-sm"
                >
                    <h2 className="text-apple-title-2 text-center text-white">
                        Create Lobby
                    </h2>

                    <input
                        type="text"
                        placeholder="Your player name"
                        value={state.player?.name}
                        onChange={(e) => dispatch({ type: 'SET_PLAYER_NAME', payload: e.target.value })}
                        className="text-apple-body bg-transparent border-white rounded-xl border-2 p-3 text-white placeholder:text-gray-300"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Lobby name"
                        value={state.lobbyName}
                        onChange={(e) => dispatch({ type: 'SET_LOBBY_NAME', payload: e.target.value })}
                        className="text-apple-body bg-transparent border-white rounded-xl border-2 p-3 text-white placeholder:text-gray-300"
                        required
                    />

                    <div className="flex justify-between items-center mt-4 gap-4">
                        <Button path="/" text="Back" shape={BtnShape.MAIN} liquid={false} icon={back} iconLight={backLight} additionalStyles="border-2" />
                        <Button submit={true} path="/waiting" text="Join" shape={BtnShape.MAIN} liquid={false} icon={plus} iconLight={plusLight} additionalStyles="border-2" />
                    </div>
                </form>
            </div>
        </section>
    );
}

export default CreateForm;