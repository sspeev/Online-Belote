import { usePlayer } from "@/hooks/usePlayer";
import { useState, type FC } from "react";

const CreateForm: FC = () => {

    const playerState = usePlayer();

    const [playerName, setPlayerName] = useState<string>('');
    const [lobbyName, setLobbyName] = useState<string>('');

    const handleCreateLobby = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    };

    return (
        <PlayerContext.Provider value={{playerName, lobbyName }}>
            <section className="create-container flex flex-col items-center 
            justify-center h-screen">
                <form onSubmit={handleCreateLobby} name="createLobbyForm">
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
                        {/* <button type="submit" disabled={loading}>
                            <p>Create</p>
                        </button> */}
                        <button onClick={() => setView('main')}>
                            <p>Back</p>
                        </button>
                        {/* <LiquidGlass
                            displacementScale={64}
                            blurAmount={0.1}
                            saturation={130}
                            aberrationIntensity={2}
                            elasticity={0.35}
                            cornerRadius={100}
                            padding="8px 16px"
                            onClick={handleCreateLobby}
                        >
                            <span className="text-white font-medium">Create</span>
                        </LiquidGlass> */}
                    </section>
                </form>
            </section>
        </PlayerContext.Provider>
    );
}
