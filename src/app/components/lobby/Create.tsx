//hooks
import { usePlayer } from "@/hooks/usePlayer";
import { useNavigate } from "@tanstack/react-router";

//components
import { Background } from "@/app/components/common/Backgound";
import Button from "@/app/components/common/Button";

//types
import { type FC } from "react";
import type { Player } from "@/types/models/Player";
import LiquidGlass from "@nkzw/liquid-glass";
import { BtnShape } from "@/types/enums/btnShape";

//icons
import back from "../../../assets/svgs/Chevrons left.svg";
import backLight from "../../../assets/svgs/Chevrons leftLight.svg";
import plus from "../../../assets/svgs/plus.svg";
import plusLight from "../../../assets/svgs/PlusLight.svg";

const CreateForm: FC = () => {
    const { playerData, dispatch } = usePlayer();
    const navigate = useNavigate();

    if (!playerData) return null; // Or a loading spinner

    const handlePlayerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedPlayer: Player = {
            ...playerData.player,
            name: e.target.value
        };
        dispatch({ type: 'SET_PLAYER', payload: updatedPlayer });
    };

    const handleLobbyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'SET_LOBBY_NAME', payload: e.target.value });
    };

    const handleCreateLobby = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Creating lobby with:", {
            playerName: playerData.player?.name,
            lobbyName: playerData.lobbyName
        });
        // --- API Call Logic Goes Here ---
        // const response = await lobbyApi.create({ ... });
        // const newLobbyId = response.data.id;
        //const newLobbyId = "12345"; // Mock ID for demonstration
        // --------------------------------

        // For demonstration, navigate to a waiting room
        //navigate({ to: '/lobby/$lobbyId/waiting', params: { lobbyId: '123' } });
    };

    return (
        <section className="create-container h-screen relative overflow-hidden">
            <Background />
            <form
                onSubmit={handleCreateLobby}
                className="absolute top-70 left-1/2 lg:top-90 lg:left-1/2 flex flex-col gap-10 lg:gap-20 justify-center items-center"
            >
                <LiquidGlass borderRadius={40}>
                    <h2 className="text-3xl mb-5 text-center text-white">Create Lobby</h2>
                    <div className="flex flex-col gap-3">
                        <input
                            type="text"
                            placeholder="Player name"
                            value={playerData.player.name}
                            onChange={handlePlayerNameChange}
                            className="border-white rounded-xl border-2 p-2 text-white placeholder:text-gray-300 placeholder:text-xl"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Lobby name"
                            value={playerData.lobbyName}
                            onChange={handleLobbyNameChange}
                            className="border-white rounded-xl border-2 p-2 text-white placeholder:text-gray-300 placeholder:text-xl"
                            required
                        />
                    </div>

                    <div className="flex justify-between items-center mt-4 gap-4">
                        <Button additionalStyles="border-2"
                            liquid={false}
                            icon={back}
                            iconLight={backLight}
                            shape={BtnShape.MAIN}
                            path="/" text="Back"
                        />

                        <Button additionalStyles="border-2"
                            liquid={false}
                            icon={plus}
                            iconLight={plusLight}
                            shape={BtnShape.MAIN}
                            submit={true}
                            text="Create"
                        />
                    </div>
                </LiquidGlass>
            </form>
        </section>
    );
}

export default CreateForm;