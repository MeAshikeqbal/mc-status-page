import { json, LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = async () => {
  try {

    const blueMapAddress = process.env.BLUEMAP_ADDRESS;
    const blueMapPlayers = `https://${blueMapAddress}/maps/world/live/players.json`;
    if (!blueMapAddress) {
      throw new Error('REACT_APP_BLUEMAP_ADDRESS environment variable is not set');
    }

    const response = await fetch(blueMapPlayers);

    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.players && Array.isArray(data.players)) {
      const playersWithHeads = data.players.map((player: { uuid: string }) => ({
        ...player,
        headUrl: `https://mc-heads.net/avatar/${player.uuid}?size=64`
      }));

      const onlineCount = data.players.length;

      return json({
        ...data,
        players: playersWithHeads,
        onlineCount: onlineCount
      });
    }

    return json(data);
  } catch (error) {
    console.error('Error fetching server status:', error);
    return json({
      error: 'Failed to fetch server status. The server might be offline or there was an error processing the request.',
    }, { status: 500 });
  }
};
