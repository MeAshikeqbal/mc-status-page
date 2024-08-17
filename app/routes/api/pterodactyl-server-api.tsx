import { json, LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  try {
    const pterodactylApiUrl = process.env.PTERODACTYL_API_URL;  // Replace with your actual API URL
    const pterodactylApiKey = process.env.PTERODACTYL_API_KEY;  // Replace with your actual API key
    const serverUUID = process.env.SERVER_UUID; // Replace with your actual server UUID

    console.log('PTERODACTYL_API_URL:', pterodactylApiUrl);
    console.log('PTERODACTYL_API_KEY:', pterodactylApiKey);
    console.log('SERVER_UUID:', serverUUID);
    if (!pterodactylApiUrl) {
      throw new Error('PTERODACTYL_API_URL environment variable is not set');
    }

    if (!pterodactylApiKey) {
      throw new Error('PTERODACTYL_API_KEY environment variable is not set');
    }

    const response = await fetch(`${pterodactylApiUrl}/api/client/servers/${serverUUID}/resources`, {
      headers: {
        'Authorization': `Bearer ${pterodactylApiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    const data = await response.json();

    return json(data);
  } catch (error) {
    console.error('Error fetching server status:', error);

    return json({
      error: 'Failed to fetch server status. The server might be offline or there was an error processing the request.',
    }, { status: 500 });
  }
};
