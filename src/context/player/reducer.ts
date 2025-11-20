import type { PlayerAction } from './actions';
import { type PlayerContextValue } from './types';

export const playerReducer = (state: PlayerContextValue, action: PlayerAction): PlayerContextValue => {
    switch (action.type) {
        case 'SET_PLAYER':
            return {
                ...state,
                playerData: {
                    ...state.playerData,
                    player: action.payload,
                }
            };
        case 'SET_LOBBY_NAME':
            return {
                ...state,
                playerData: {
                    ...state.playerData,
                    lobbyName: action.payload,
                }
            };
        case 'SET_LOADING':
            return {
                ...state,
                playerData: {
                    ...state.playerData,
                    loading: action.payload,
                }
            };
        default:
            return state;
    }
};