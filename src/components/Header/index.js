import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  return (
    <header>
      <Link className="logo" to="/">Prime Movies</Link>
      <Link className="favorites" to="/meus-filmes">Meus filmes</Link>
    </header>
  )
}

export default Header;