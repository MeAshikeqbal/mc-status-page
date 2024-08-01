import { useEffect, useState } from 'react';

interface ServerStatus {
    online: boolean;
    players: {
        online: number;
        max: number;
    };
    version: {
        name: string;
    };
    motd: {
        html: string;
        clean: string;
    };
    gamemode: string;
    host: string;
}

export default function Bedrock() {
    const [serverStatus, setServerStatus] = useState<null | ServerStatus>(null);

    useEffect(() => {
        fetch('https://api.mcstatus.io/v2/status/bedrock/cmc.cappybaralab.me:45262')
            .then(response => response.json())
            .then(data => setServerStatus(data))
            .catch(error => console.error('Error fetching Bedrock server status:', error));
    }, []);

    return (
        <>
            <aside>
                {serverStatus ? (
                    <div
                    className='bg-[#191919] rounded-b-lg p-1'
                    >
                        <div>
                            <ul>
                                <li
                                className='block lg:flex w-full p-4 border-b border-b-black/10 dark:border-b-white/10 '
                                >
                                    <h3>
                                        Server Status :
                                    </h3>
                                    <p
                                    className={serverStatus.online ? ' bg-green-600 rounded-lg p-1' : 'text-red-500'}
                                    >
                                        {serverStatus.online ? 'Online' : 'Offline'}
                                    </p>
                                </li>
                            </ul>
                            <p className='text-white'>Server Status: {serverStatus.online ? 'Online' : 'Offline'}</p>
                            <p className='text-white'>Players Online: {serverStatus.players.online}/{serverStatus.players.max}</p>
                            <p className='text-white'>Version: {serverStatus.version.name}</p>
                            <p className='text-white'>MOTD: {serverStatus.motd.clean}</p>
                            <p className='text-white'>Gamemode: {serverStatus.gamemode}</p>
                            <p className='text-white'>Host: {serverStatus.host}</p>
                        </div>

                    </div>
                ) : (
                    <p className='text-white'>This Server is Ofline</p>
                )}
            </aside>
        </>
    );
}