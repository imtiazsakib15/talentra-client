import logo from "@/assets/talentra-logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/">
      <img
        src={logo}
        alt="Talentra logo"
        className="h-8 sm:h-10 object-center"
      />
    </Link>
  );
};

export default Logo;
