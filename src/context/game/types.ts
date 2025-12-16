import type { Dispatch } from 'react';
import type { GameAction } from "./actions.ts";

//types
import type { Game } from "@/types/models/Game.ts";

export type GameState = {
  game: Game;
  error: null | string;
};

export type GameContextValue = {
  gameData: GameState;
  dispatchGame: Dispatch<GameAction>;
};