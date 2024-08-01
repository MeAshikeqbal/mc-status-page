import { NavLink } from "@remix-run/react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";

export default function Nav() {
    return (
        <>
            <Navbar
            className="bg-[#191919] opacity-80"
            >
                <NavbarBrand
                    className="flex justify-between items-center p-5 mx-auto max-w-7xl"
                >
                    <p
                        className="text-2xl font-bold"
                    >
                        MC Status
                    </p>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarItem>
                        <NavLink to="/">Home</NavLink>
                    </NavbarItem>
                    <NavbarItem>
                        <NavLink to="/map">Map</NavLink>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
        </>
    );
}