import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { useEffect, useState } from "react";

interface Player {
    uuid: string;
    name: string;
    foreign: boolean;
    headUrl: string;
    position: {
        x: number;
        y: number;
        z: number;
    };
    rotation: {
        pitch: number;
        yaw: number;
        roll: number;
    };
}

interface PlayersData {
    players: Player[];
    onlineCount: number;
}

export default function Players() {
    const [playersData, setPlayersData] = useState<null | PlayersData>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPlayers = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('/players-api');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: PlayersData = await response.json();
                if (data.players && Array.isArray(data.players)) {
                    setPlayersData(data);
                } else {
                    console.error('Unexpected data structure:', data);
                    setError('Unexpected data structure');
                }
            } catch (error) {
                console.error('Error fetching server status:', error);
                setError('Error fetching server status');
            } finally {
                setLoading(false);
            }
        };

        fetchPlayers();
        const intervalId = setInterval(fetchPlayers, 60000);

        return () => clearInterval(intervalId);
    }, []);

    if (loading) {
        return (
            <div className="mb-4">
                <h2 className="text-2xl font-bold">Online Player List</h2>
                <p className="text-sm text-gray-500">Loading...</p>
                <Table aria-label="players">
                    <TableHeader>
                        <TableColumn>Player Head</TableColumn>
                        <TableColumn>Player Username</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"No one online"}>
                        <TableRow key="loading">
                            <TableCell>Loading...</TableCell>
                            <TableCell>Loading...</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mb-4">
                <h2 className="text-2xl font-bold">Online Player List</h2>
                <p 
                className="mt-2 text-sm text-red-500"
                >
                    
                    Maybe the server is offline or there was an error processing the request.
                    
                    </p>
            </div>
        );
    }
    return (
        <>
            <div>
                <div
                    className="mb-4"
                >
                    <h2 className="text-2xl font-bold">Online Player List</h2>
                    <p className="text-sm text-gray-500">
                        There are currently &nbsp;
                        <span className="font-bold">
                          {playersData?.onlineCount} of 100
                        </span>
                        &nbsp; players online.
                    </p>
                </div>
                <Table aria-label="players">
                    <TableHeader>
                        <TableColumn>Player Head</TableColumn>
                        <TableColumn>Player Username</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"No one online"}>
                        {playersData!.players.map(player => (
                            <TableRow key={player.uuid}>
                                <TableCell>
                                    <img src={player.headUrl} alt={`${player.name}'s head`} className="w-8 h-8" />
                                </TableCell>
                                <TableCell>{player.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
