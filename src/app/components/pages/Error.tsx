
// types
import type {FC} from "react";

// hooks
import { useLobby } from "@/hooks/useLobby";

const Error: FC = () => {

    const { lobbyData } = useLobby();

    return (
        <div className="error-container">
            <p>Unexpected error: {lobbyData.error}</p>
            <button onClick={() : void => window.location.reload()}>
                <p>Retry</p>
            </button>
        </div>
    );
};

export default Error;