import { NavLink } from "react-router";

type TNavBarLinkProps = {
  to: string;
  children: string;
};

const NavBarLink = ({ to, children }: TNavBarLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "border-b-2 border-blue-900" : ""
      }
    >
      {children}
    </NavLink>
  );
};

export default NavBarLink;
