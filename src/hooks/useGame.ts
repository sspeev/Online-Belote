import { useContext, useDebugValue } from "react";
import { GameContext } from "@/context/game/context";

export const useGame = () => {
  const contextValue = useContext(GameContext);

  useDebugValue(contextValue.gameData ?? 'loading');

  return contextValue;
}
