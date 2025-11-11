import { PlayerContext } from "@/context/common/context";
import { useContext, useDebugValue } from "react";

export const usePlayer = () => {
    useDebugValue(PlayerContext ?? 'loading');

    return useContext(PlayerContext);
}