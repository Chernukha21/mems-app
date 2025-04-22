import './App.css'
import {Navbar, NavbarContent, NavbarItem} from "@heroui/react";
import {Outlet} from "react-router-dom";
import NavLink from "./components/NavLink.tsx";

function App() {
    return (
        <>
            <Navbar className="w-full z-50">
                <NavbarContent className="gap-4" justify="center">
                    <NavbarItem>
                        <NavLink to="/list" label="List" />
                    </NavbarItem>
                    <NavbarItem>
                        <NavLink to="/table">
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
