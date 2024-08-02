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
    const response = await fetch('https://api.mcstatus.io/v2/status/java/cmc.cappybaralab.me:45262');
    const data: ServerStatus = await response.json();

    return json(data);
};
