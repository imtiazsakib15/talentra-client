import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import { NAV_LINKS } from "@/constants/navLinks.constant";
import NavBarLink from "./NavBarLink";
import Container from "../Container";
import { Link } from "react-router";
import talentraLogo from "@/assets/talentra-logo.png";

const NavBar = () => {
  return (
    <div className="bg-white py-3 lg:py-4 border-b shadow-md">
      <Container>
        <div className="flex justify-between">
          <Link to={"/"}>
            <img
              src={talentraLogo}
              alt="Talentra logo"
              className="h-10 sm:h-12 object-center"
            />
          </Link>
          <div className="flex items-center gap-5">
            {/* navbar for large devices */}
            <div className="hidden md:block space-x-5">
              {NAV_LINKS.map((navLink) => (
                <NavBarLink key={navLink.path} to={navLink.path}>
                  {navLink.page}
                </NavBarLink>
              ))}

              {/* user register/login or logout option for large devices */}

              <NavBarLink to={"/auth/login"}>Login</NavBarLink>
              <NavBarLink to={"/auth/signup"}>Sign Up</NavBarLink>
            </div>

            {/* navbar for small devices */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <MenuIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-52">
                  <DropdownMenuGroup>
                    {NAV_LINKS.map((navLink) => (
                      <DropdownMenuItem key={navLink.path}>
                        <NavBarLink to={navLink.path}>
                          {navLink.page}
                        </NavBarLink>
                      </DropdownMenuItem>
                    ))}

                    {/* user register/login or logout option for small devices */}

                    <DropdownMenuItem>
                      <NavBarLink to={"/auth/login"}>Login</NavBarLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <NavBarLink to={"/auth/signup"}>Sign Up</NavBarLink>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
