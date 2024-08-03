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