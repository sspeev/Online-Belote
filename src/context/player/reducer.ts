import type { PlayerAction } from './actions';
import { type PlayerState } from './types';

export const playerReducer = (state: PlayerState, action: PlayerAction): PlayerState => {
    switch (action.type) {
        case 'SET_PLAYER_NAME':
            // Return a new state object with the updated playerName
            return {
                ...state,
                playerName: action.payload,
            };
        case 'SET_LOBBY_NAME':
            return {
                ...state,
                lobbyName: action.payload,
            };
        // Add other cases here as your state grows
        default:
            return state;
    }
};