export default function Map() {
    return (
        <>
            <iframe
                title="CMC Map"
                src="https://cmcmap.cappybaralab.me"
                width={window.innerWidth}
                height={window.innerHeight}
                className="absolute inset-0"
                ></iframe>
        </>
    )
}