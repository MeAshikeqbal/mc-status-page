import { json, LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = async () => {
  const response = await fetch('http://cmcmap.cappybaralab.me/maps/world/live/players.json');
  const data = await response.json();

  if (data.players && Array.isArray(data.players)) {
    const playersWithHeads = data.players.map((player: { uuid: string; }) => ({
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
};
