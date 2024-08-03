import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
    return[
        {
            title: "CMC Map"
            
        },
        {
            name: "description",
            content: "Map of the CMC Mincraft Server"
        },
        {
            name: "keywords",
            content: "minecraft, map, cmc, server"
        },
        {
            property: "og:title",
            content: "CMC Map"
        }
    ]
}

export default function Map() {
    const isServer = typeof window === "undefined";
    if (isServer) {
        return null
    }
    return (
        <>
            <iframe
                title="CMC Map"
                src="https://cmcmap.cappybaralab.me"
                width={window.innerWidth}
                height={window.innerHeight}
                className="absolute inset-0 pt-16"
                ></iframe>
        </>
    )
}