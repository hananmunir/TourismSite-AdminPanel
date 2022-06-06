import { ReactComponent as LogoDark } from "../assets/images/logos/amplelogo.svg";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      style={{
        padding: "1rem 1rem 0 1rem",
        textDecoration: "none",
        color: "#000",
        fontSize: "1.3rem",
      }}
      to='/'
    >
      <span style={{ color: "#212529", fontWeight: "700" }}>TotheStars</span>{" "}
      Admin
    </Link>
  );
};

export default Logo;
