//import { usePlayer } from "@/hooks/usePlayer";
import { useState, type FC } from "react";
import { Background } from "../common/Backgound";
import LiquidGlass from "@nkzw/liquid-glass";

const CreateForm: FC = () => {

    //const playerState = usePlayer();

    const [playerName, setPlayerName] = useState<string>('');
    const [lobbyName, setLobbyName] = useState<string>('');

    const handleCreateLobby = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    };

    return (
        <section className="create-container h-screen relative overflow-hidden">
            <Background />
            {/* <form onSubmit={handleCreateLobby} name="createLobbyForm">
                <div className="flex flex-col gap-1">
                    <label htmlFor="playerName">Player name</label>
                    <input
                        type="text"
                        id="playerName"
                        placeholder="Enter your name"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        required />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="lobbyName">Lobby name</label>
                    <input
                        type="text"
                        id="lobbyName"
                        placeholder="Enter lobby name"
                        value={lobbyName}
                        onChange={(e) => setLobbyName(e.target.value)} />
                </div>
                <section className="button-wrapper">
                    <button type="submit" disabled={loading}>
                            <p>Create</p>
                        </button>
                    <button onClick={() => { }}>
                        <p>Back</p>
                    </button>
                </section>
            </form> */}
            <div className="absolute top-70 left-0 lg:top-70 lg:left-30 w-sm lg:w-2xl flex flex-col gap-10 lg:gap-20 justify-center items-center">
                <LiquidGlass>
                    <div className="py-40 px-50">
                        <h2>Your content here</h2>
                        <p>This will have the liquid glass effect</p>
                    </div>
                </LiquidGlass>
            </div>
        </section>
    );
}

export default CreateForm;