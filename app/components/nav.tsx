import { NavLink } from "@remix-run/react";

export default function Nav() {
    return (
        <>
            <nav
                className="bg-[#181818] text-white"
            >
                <div
                    className="flex justify-between items-center p-5 mx-auto max-w-7xl"
                >

                    <h1
                    className="text-2xl font-bold"
                    >MC Status</h1>
                    <ul
                        className="flex justify-between items-center space-x-4"
                    >
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/map">Map</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}