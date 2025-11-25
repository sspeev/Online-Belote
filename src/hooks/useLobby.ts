import { useContext, useDebugValue } from "react";
import { LobbyContext } from "@/context/lobby/context";

export const useLobby = () => {
  const contextValue = useContext(LobbyContext);

  useDebugValue(contextValue.lobbyData ?? 'loading');

  return contextValue;
}
