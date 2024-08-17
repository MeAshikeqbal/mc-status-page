import { NavLink } from "@remix-run/react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/navbar";
import React from "react";

export default function Nav() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <>
            <Navbar
                onMenuOpenChange={setIsMenuOpen}
                className="bg-[#191919] opacity-80"
            >
                <NavbarContent>
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="sm:hidden"
                    />
                    <NavbarBrand
                        className="flex justify-between items-center p-5 mx-auto max-w-7xl"
                    >
                        <p
                            className="text-2xl font-bold"
                        >
                            MC Status
                        </p>
                    </NavbarBrand>
                </NavbarContent>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarItem>
                        <NavLink to="/">Home</NavLink>
                    </NavbarItem>
                    <NavbarItem>
                        <NavLink to="/players">Players List</NavLink>
                    </NavbarItem>
                    <NavbarItem>
                        <NavLink to="/map">Map</NavLink>
                    </NavbarItem>
                </NavbarContent>
                <NavbarMenu>
                    <NavbarMenuItem>
                        <NavLink to="/">Home</NavLink>
                    </NavbarMenuItem>
                    <NavbarMenuItem>
                        <NavLink to="/players">Players List</NavLink>
                    </NavbarMenuItem>
                    <NavbarMenuItem>
                        <NavLink to="/map">Map</NavLink>
                    </NavbarMenuItem>
                </NavbarMenu>
            </Navbar>
        </>
    );
}