import { json, LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [
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
export const loader: LoaderFunction = async () => {
    const BLUEMAP_ADDRESS = process.env.BLUEMAP_ADDRESS;
    return json({ BLUEMAP_ADDRESS });
};

export default function Map() {
    const { BLUEMAP_ADDRESS } = useLoaderData() as { BLUEMAP_ADDRESS: string };

    const isServer = typeof window === "undefined";
    if (isServer) {
        return null;
    }
    return (
        <>
            <iframe
                title="CMC Map"
                src={`https://${BLUEMAP_ADDRESS}`}
                width={window.innerWidth}
                height={window.innerHeight}
                className="absolute inset-0 pt-16 pb-10"
            ></iframe>
        </>
    )
}