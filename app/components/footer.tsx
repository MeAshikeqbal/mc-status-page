export default function Footer() {
    return (
        <footer className="bg-zinc-900 text-white fixed bottom-0 w-full p-2">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4">
                <p className="text-center md:text-left">
                    Created with ❤️ by{' '}
                    <a href="https://itsashik.info" className="underline">
                        Ashik Eqbal
                    </a>
                </p>
                <span className="hidden md:inline">|</span>
                <p className="hidden md:block text-center md:text-left">
                    View source code on{' '}
                    <a href="https://github.com/MeAshikeqbal/mc-status-page" className="underline">
                        GitHub
                    </a>
                </p>            
                </div>
        </footer>
    );
}
