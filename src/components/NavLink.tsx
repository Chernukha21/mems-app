import { NavLink as RouterNavLink, useMatch } from "react-router-dom";
import { ReactNode } from "react";
import clsx from "clsx";

type Props = {
    to: string;
    label?: string;
    children?: ReactNode;
};

const NavLink = ({ to, label, children }: Props) => {
    const match = useMatch(to);

    return (
        <RouterNavLink
            to={to}
            className={clsx(
                "transition-colors hover:text-blue-600",
                match ? "text-blue-900 font-semibold" : "text-gray-700"
            )}
        >
            {children || label}
        </RouterNavLink>
    );
};

export default NavLink;