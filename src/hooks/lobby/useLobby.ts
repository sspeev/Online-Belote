import { useContext } from "react";
import { LobbyContext } from "@/context/lobby/context";

export const useLobby = () => 
  useContext(LobbyContext);
