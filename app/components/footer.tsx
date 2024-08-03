export default function Footer() {
    return (
        <footer
            className="bg-zinc-900 h-16 flex items-center justify-center text-white fixed bottom-0 w-full"
        >
            <p>
                Created with ❤️ by {'Ashik Eqbal'}
            </p>
            <span className="mx-2">|</span>
            <p>
                Last updated on {new Date().toLocaleTimeString()}
            </p>
            <span className="mx-2">|</span>
            <p>
                view source code on <a href="https://github.com/MeAshikeqbal/mc-status-page">GitHub</a>
            </p>
        </footer>
    );
}