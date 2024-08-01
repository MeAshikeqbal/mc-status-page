import { useEffect, useState } from 'react';
import { Chip } from "@nextui-org/react";
import { Snippet } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";



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
    port: number;
}

export default function Bedrock() {
    const [serverStatus, setServerStatus] = useState<null | ServerStatus>(null);

    useEffect(() => {
        const fetchServerStatus = () => {
            fetch('https://api.mcstatus.io/v2/status/bedrock/cmc.cappybaralab.me:45262')
                .then(response => response.json())
                .then(data => setServerStatus(data))
                .catch(error => console.error('Error fetching Bedrock server status:', error));
        };
        fetchServerStatus();
        const intervalId = setInterval(fetchServerStatus, 60000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <aside>
                {serverStatus ? (
                    <div
                        className='bg-[#191919] rounded-b-lg p-3'
                    >
                        <Table hideHeader removeWrapper>
                            <TableHeader>
                                <TableColumn>NAME</TableColumn>
                                <TableColumn>INFO</TableColumn>
                            </TableHeader>
                            <TableBody>
                                <TableRow key="1">
                                    <TableCell>
                                        Host:
                                    </TableCell>
                                    <TableCell>
                                        <Snippet
                                            symbol=">"
                                        >
                                            {serverStatus.host}
                                        </Snippet>
                                    </TableCell>
                                </TableRow>
                                <TableRow key="2">
                                    <TableCell>
                                        Server Info:
                                    </TableCell>
                                    <TableCell>
                                        <Snippet
                                            symbol=">"
                                        >
                                            {serverStatus.port}
                                        </Snippet>
                                    </TableCell>
                                </TableRow>
                                <TableRow key="3">
                                    <TableCell>
                                        Moted :
                                    </TableCell>
                                    <TableCell>

                                        <pre
                                            className=' bg-black rounded text-white p-1 flex items-center max-w-72'
                                        >
                                            <div dangerouslySetInnerHTML={{ __html: serverStatus.motd.html }} />
                                        </pre>
                                    </TableCell>
                                </TableRow>

                                <TableRow key="4">
                                    <TableCell>
                                        Server Status :
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            color='success'
                                            radius="md"
                                        >
                                            {serverStatus.online ? 'Online' : 'Offline'}
                                        </Chip>
                                    </TableCell>
                                </TableRow>
                                <TableRow key="5">
                                    <TableCell>
                                        Players Online :
                                    </TableCell>
                                    <TableCell>

                                        <Chip
                                            color='success'
                                            radius="md"
                                        >
                                            {serverStatus.players.online}/{serverStatus.players.max}
                                        </Chip>
                                    </TableCell>
                                </TableRow>
                                <TableRow key="6">
                                    <TableCell>
                                        Version :
                                    </TableCell>
                                    <TableCell>

                                        <Chip
                                            color='success'
                                            radius="md"
                                        >
                                            {serverStatus.version.name}
                                        </Chip>
                                    </TableCell>
                                </TableRow>
                                <TableRow key="7">
                                    <TableCell>
                                        Gamemode :
                                    </TableCell>
                                    <TableCell>

                                        <Chip
                                            color='success'
                                            radius="md"
                                        >
                                            {serverStatus.gamemode}
                                        </Chip>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table >
                    </div>
                ) : (
                    <Table hideHeader removeWrapper>
                    <TableHeader>
                        <TableColumn>NAME</TableColumn>
                        <TableColumn>INFO</TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell>
                                Host:
                            </TableCell>
                            <TableCell>
                                <Snippet
                                    symbol=">"
                                >
                                    {serverStatus.host}
                                </Snippet>
                            </TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell>
                                Server Info:
                            </TableCell>
                            <TableCell>
                                <Snippet
                                    symbol=">"
                                >
                                    {serverStatus.port}
                                </Snippet>
                            </TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell>
                                Moted :
                            </TableCell>
                            <TableCell>

                                <pre
                                    className=' bg-black rounded text-white p-1 flex items-center max-w-72'
                                >
                                    <div dangerouslySetInnerHTML={{ __html: serverStatus.motd.html }} />
                                </pre>
                            </TableCell>
                        </TableRow>

                        <TableRow key="4">
                            <TableCell>
                                Server Status :
                            </TableCell>
                            <TableCell>
                                <Chip
                                    color='success'
                                    radius="md"
                                >
                                    {serverStatus.online ? 'Online' : 'Offline'}
                                </Chip>
                            </TableCell>
                        </TableRow>
                        <TableRow key="5">
                            <TableCell>
                                Players Online :
                            </TableCell>
                            <TableCell>

                                <Chip
                                    color='success'
                                    radius="md"
                                >
                                    {serverStatus.players.online}/{serverStatus.players.max}
                                </Chip>
                            </TableCell>
                        </TableRow>
                        <TableRow key="6">
                            <TableCell>
                                Version :
                            </TableCell>
                            <TableCell>

                                <Chip
                                    color='success'
                                    radius="md"
                                >
                                    {serverStatus.version.name}
                                </Chip>
                            </TableCell>
                        </TableRow>
                        <TableRow key="7">
                            <TableCell>
                                Gamemode :
                            </TableCell>
                            <TableCell>

                                <Chip
                                    color='success'
                                    radius="md"
                                >
                                    {serverStatus.gamemode}
                                </Chip>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table >
            </div>
                )}
            </aside>
        </>
    );
}