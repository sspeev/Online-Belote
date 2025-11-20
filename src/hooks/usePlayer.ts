import { PlayerContext } from "../context/player/context";
import { useContext, useDebugValue } from "react";

export const usePlayer = () => {
    useDebugValue(PlayerContext ?? 'loading');

    return useContext(PlayerContext);
}