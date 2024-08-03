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

    useEffect(() => {
        const fetchPlayers = () => {
            fetch('/players-api')
                .then(response => response.json())
                .then(data => {
                    if (data.players && Array.isArray(data.players)) {
                        setPlayersData(data);
                    } else {
                        console.error('Unexpected data structure:', data);
                    }
                })
                .catch(error => console.error('Error fetching server status:', error));
        };
        fetchPlayers();
        const intervalId = setInterval(fetchPlayers, 60000);
        return () => clearInterval(intervalId);
    }, []);

    if (!playersData) {
        return <div>
            <div
                className="mb-4"
            >

                <h2 className="text-2xl font-bold">Online Player List</h2>
                <p className="text-sm text-gray-500">
                    Loading...
                </p>
            </div>
            <Table aria-label="players">
                <TableHeader>
                    <TableColumn>Player Head</TableColumn>
                    <TableColumn>Player Username</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No one online"}>
                    <TableRow key="1">
                        <TableCell>
                            Loading...
                        </TableCell>
                        <TableCell>
                            Loading...
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>;
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
                          {playersData.onlineCount} of 100
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
                        {playersData.players.map(player => (
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
