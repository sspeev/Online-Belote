import { useContext } from "react";
import { LobbyContext } from "@/context/lobby/context";

export const useLobby = () => {
  const contextValue = useContext(LobbyContext);

  return contextValue;
}
