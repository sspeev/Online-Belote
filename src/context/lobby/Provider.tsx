import { LobbyContext } from "./context";
import { useContext, type ReactNode } from "react";

export const LobbyProvider = ({ children } : {children : ReactNode}) => {
    const { lobby, dispatchLobby } = useContext(LobbyContext);
    return (
        <LobbyContext.Provider value={{ lobby, dispatchLobby }}>
            {children}
        </LobbyContext.Provider>
    );
}