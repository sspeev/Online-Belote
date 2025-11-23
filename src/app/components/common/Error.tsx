//hooks
import { useLobby } from "@/hooks/useLobby";

//types
import { type FC } from "react";

const Error: FC = () => {

    const { lobbyData } = useLobby();

    return (
        <div className="error-container">
            <p>Unexpected error: {lobbyData.error}</p>
            <button onClick={() => window.location.reload()}>
                <p>Retry</p>
            </button>
        </div>
    );
};

export default Error;