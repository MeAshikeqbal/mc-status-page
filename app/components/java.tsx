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
        clean: string;
    };
    gamemode: string;
}

export default function Java() {
    const [serverStatus, setServerStatus] = useState<null | ServerStatus>(null);

    useEffect(() => {
        fetch('https://api.mcstatus.io/v2/status/java/cmc.cappybaralab.me:45262')
            .then(response => response.json())
            .then(data => setServerStatus(data))
            .catch(error => console.error('Error fetching java server status:', error));
    }, []);

    return (
        <>
            <aside>
                {serverStatus ? (
                    <div className="bg-[#404040] p-3 rounded-lg">
                        <img src="/mcgameplay.png" alt="Gameplay"
                            className='object-cover rounded-lg mb-4'
                        />
                        <h2
                            className='text-2xl text-white font-bold'>Java Server</h2>
                        <div>

                        </div>
                    </div>
                ) : (
                    <p className='text-white'>This Server is Ofline</p>
                )}
            </aside>
        </>
    );
}