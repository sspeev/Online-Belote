import { useContext, useDebugValue } from "react";
import { LobbyContext } from "@/context/lobby/context";


export const useLobby = () => {

    useDebugValue(LobbyContext ?? 'loading');

    return useContext(LobbyContext);
}