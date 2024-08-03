import { json, LoaderFunction } from '@remix-run/node';

interface Version {
    name: string;
    protocol: number;
}

interface Players {
    online: number;
    max: number;
}

interface Motd {
    raw: string;
    clean: string;
    html: string;
}

interface ServerStatus {
    online: boolean;
    host: string;
    port: number;
    ip_address: string | null;
    eula_blocked: boolean;
    retrieved_at: number;
    expires_at: number;
    version: Version;
    players: Players;
    motd: Motd;
    gamemode: string;
    server_id: string;
    edition: string;
}

export const loader: LoaderFunction = async () => {
    try {
        const response = await fetch(`https://api.mcstatus.io/v2/status/bedrock/${process.env.BEDROCK_SERVER_ADDRESS}:${process.env.BEDROCK_SERVER_PORT}`);

        if (!response.ok) {
            throw new Error(`Error fetching server status: ${response.statusText}`);
        }

        const data: ServerStatus = await response.json();

        // Handle the case when the server is offline
        if (!data.online) {
            return json({
                online: false,
                message: "The server is currently offline.",
            });
        }

        return json(data);

    } catch (error) {
        return json({
            online: false,
            message: "Failed to fetch server status.",
            error: (error as Error).message,
        });
    }
};
