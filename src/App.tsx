import './App.css'
import {Navbar, NavbarContent, NavbarItem} from "@heroui/react";
import {NavLink, Outlet} from "react-router-dom";

function App() {
    return (
        <>
            <Navbar className="w-full z-50">
                <NavbarContent className="gap-4" justify="center">
                    <NavbarItem>
                        <NavLink
                            to="/list"
                            className={({ isActive }) => isActive ? "text-blue-900" : ""}
                        >
                            List
                        </NavLink>
                    </NavbarItem>
                    <NavbarItem>
                        <NavLink
                            to="/table"
                            className={({ isActive }) => isActive ? "text-blue-900" : ""}
                        >
                            Table
                        </NavLink>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>

            <div className="pt-16 px-4">
                <Outlet />
            </div>
        </>
    )
}

export default App
