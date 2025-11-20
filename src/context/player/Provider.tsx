

export const PlayerProvider = ({ children, value }: { children: React.ReactNode; value: any }) => {
    
    const [state, dispatch] = useReducer(playerReducer, defaultState);
      const providerValue = useMemo<PlayerContextValue>(() => ({
        playerData: state.playerData,
        dispatch,
      }), [state]);

    return (
        <PlayerContext.Provider value={providerValue}>
            {children}
        </PlayerContext.Provider>
    );
}