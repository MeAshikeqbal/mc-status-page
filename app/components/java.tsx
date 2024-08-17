import { useEffect, useState } from 'react';
import { Chip, Snippet, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

interface Version {
    name_raw: string;
    name_clean: string;
    name_html: string;
    protocol: number;
}

interface Players {
    online: number;
    max: number;
    list: unknown[];
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
    srv_record: string | null;
    version: Version;
    players: Players;
    motd: Motd | null;
    icon: string | null;
    mods: unknown[];
    software: string | null;
    plugins: unknown[];
}

export default function Bedrock() {
    const [serverStatus, setServerStatus] = useState<ServerStatus | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchServerStatus = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch('/java-server-api');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: ServerStatus = await response.json();
                setServerStatus(data);
            } catch (error) {
                setError('Error fetching server status.');
                console.error('Error fetching Java server status:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchServerStatus();
        const intervalId = setInterval(fetchServerStatus, 60000);
        return () => clearInterval(intervalId);
    }, []);

    if (loading) {
        return (
            <div className='bg-[#191919] rounded-b-lg p-3'>
                <p className='text-white'>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className='bg-[#191919] rounded-b-lg p-3'>
                <p className='text-red-500'>{error}</p>
            </div>
        );
    }

    return (
        <aside
        className='mb-10'
        >
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
                                <Snippet symbol=">">{serverStatus?.host || 'N/A'}</Snippet>
                            </TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell>Port:</TableCell>
                            <TableCell>
                                <Snippet symbol=">">{serverStatus?.port || 'N/A'}</Snippet>
                            </TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell>Motd:</TableCell>
                            <TableCell>
                                <pre className='bg-black rounded text-white p-1 flex items-center max-w-72'>
                                    <div dangerouslySetInnerHTML={{ __html: serverStatus?.motd?.html || "We are offline" }} />
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
                                    {serverStatus?.version?.name_clean || 'N/A'}
                                </Chip>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </aside>
    );
}
