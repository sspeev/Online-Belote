//import LobbyProvider from '../../providers/LobbyProvider';
import { Outlet } from '@tanstack/react-router';

const LobbyLayout = () => {
    return (
        // <LobbyProvider>
            <Outlet />
        // </LobbyProvider>
    );
}

export default LobbyLayout;