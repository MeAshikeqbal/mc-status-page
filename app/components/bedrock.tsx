import { useEffect, useState } from 'react';
import { Chip, Snippet, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

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

export default function Bedrock() {
    const [serverStatus, setServerStatus] = useState<null | ServerStatus>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchServerStatus = async () => {
            try {
                const response = await fetch('/bedrock-server-api');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: ServerStatus = await response.json();
                setServerStatus(data);
            } catch (error) {
                setError('Error fetching Bedrock server status');
            } finally {
                setLoading(false);
            }
        };

        fetchServerStatus();
        const intervalId = setInterval(fetchServerStatus, 60000);

        return () => clearInterval(intervalId);
    }, []);

    if (loading) {
        return <div className='bg-[#191919] rounded-b-lg p-3 text-white'>Loading...</div>;
    }

    if (error) {
        return <div className='bg-[#191919] rounded-b-lg p-3 text-white'>{error}</div>;
    }

    return (
        <aside>
            <div className='bg-[#191919] rounded-b-lg p-3'>
                <Table hideHeader removeWrapper aria-label="Server Info">
                    <TableHeader>
                        <TableColumn>NAME</TableColumn>
                        <TableColumn>INFO</TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell>Host:</TableCell>
                            <TableCell>
                                <Snippet symbol=">">{serverStatus?.host}</Snippet>
                            </TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell>Port:</TableCell>
                            <TableCell>
                                <Snippet symbol=">">{serverStatus?.port}</Snippet>
                            </TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell>Motd:</TableCell>
                            <TableCell>
                                <pre className='bg-black rounded text-white p-1 flex items-center max-w-72'>
                                    <div dangerouslySetInnerHTML={{ __html: serverStatus?.motd.html || "We are offline" }} />
                                </pre>
                            </TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell>Server Status:</TableCell>
                            <TableCell>
                                <Chip color={serverStatus?.online ? 'success' : 'danger'} radius="md">
                                    {serverStatus?.online ? 'Online' : 'Offline'}
                                </Chip>
                            </TableCell>
                        </TableRow>
                        <TableRow key="5">
                            <TableCell>Players Online:</TableCell>
                            <TableCell>
                                <Chip color={serverStatus?.online ? 'success' : 'danger'} radius="md">
                                    {serverStatus?.players ? `${serverStatus.players.online}/${serverStatus.players.max}` : 'N/A'}
                                </Chip>
                            </TableCell>
                        </TableRow>
                        <TableRow key="6">
                            <TableCell>Version:</TableCell>
                            <TableCell>
                                <Chip color={serverStatus?.online ? 'success' : 'danger'} radius="md">
                                    {serverStatus?.version.name || 'N/A'}
                                </Chip>
                            </TableCell>
                        </TableRow>
                        <TableRow key="7">
                            <TableCell>Gamemode:</TableCell>
                            <TableCell>
                                <Chip color={serverStatus?.online ? 'success' : 'danger'} radius="md">
                                    {serverStatus?.gamemode || 'N/A'}
                                </Chip>
                            </TableCell>
                        </TableRow>
                        <TableRow key="8">
                            <TableCell>Edition:</TableCell>
                            <TableCell>
                                <Chip color={serverStatus?.online ? 'success' : 'danger'} radius="md">
                                    {serverStatus?.edition || 'N/A'}
                                </Chip>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </aside>
    );
}
