# mc-status-page
A simple Minecraft server status page with BlueMap integration

## Features
- Show server status (with all the relevant information)
- Show server player list (with player count)
- Show blue map

## Requirements
### Minecraft Server required plugins
- [Bluemap](https://bluemap.bluecolored.de/)

## Configuration
Create a `.env` file in the root directory with the following content
```env
//Bluemap Public Address
BLUEMAP_ADDRESS=cmcmap.cappybaralab.me

//Java Server Address (Port is optional)
JAVA_SERVER_ADDRESS=cmc.cappybaralab.me
JAVA_SERVER_PORT=45262

//Bedrock Server Address
BEDROCK_SERVER_ADDRESS=cmc.cappybaralab.me
BEDROCK_SERVER_PORT=45262
```

## How to use
1. Clone the repo
2. Run `npm install`
3. Run `npm run build`
4. Run `npm run start`
5. Open `http://localhost:3000` in your browser

## How to deploy as docker container
1. pull the image `docker pull ghcr.io/meashikeqbal/mc-status-page:0.0.1`
2. Run the container
 ``` bash
 docker run -d -p 3000:3000 -e SERVER_ADDRESS=cmc.cappybaralab.me -e SERVER_PORT=45262 -e BLUEMAP_ADDRESS=cmcmap.cappybaralab.me ghcr.io/meashikeqbal/mc-status-page:0.0.1
 ```
3. Open `http://localhost:3000` in your browser

### Example docker-compose.yml
```yml
version: '3.3'
services:
  mc-status-page:
    image: ghcr.io/meashikeqbal/mc-status-page:0.0.1
    container_name: mc-status-page
    environment:
      - JAVA_SERVER_ADDRESS=cmc.cappybaralab.me
      - JAVA_SERVER_PORT=45262
      - BEDROCK_SERVER_ADDRESS=cmc.cappybaralab.me
      - BEDROCK_SERVER_PORT=45262
      - BLUEMAP_ADDRESS=cmcmap.cappybaralab.me
    ports:
      - "3000:3000"
```

## Screenshots
![image](/public/Screenshot.png)

## Credits
- [Minecraft Server Status](mcstatus.io)
- [BlueMap](https://bluemap.bluecolored.de/)
