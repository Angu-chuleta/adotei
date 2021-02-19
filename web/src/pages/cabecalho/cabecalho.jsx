import React, { useEffect } from "react";
import logodotei from "../../assets/imagens/logodotei.svg";
import { Link, useHistory } from "react-router-dom";
import "./cabecalho.css";

export default function Cabecalho() {
  const [nome, setNome] = React.useState("");
  const [role, setRole] = React.useState(1);
  const [width, setwidth] = React.useState(window.innerWidth);

  const history = useHistory();

  useEffect(() => {
    let saved = JSON.parse(localStorage.getItem("adotei@token"));
    if (saved === null) {
      history.push("/");
    } else {
      setNome(saved.user.name);
      setRole(saved.role);
    }
    const updateWidth = () => {
      setwidth(window.innerWidth);
    };
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [history, width]);

  const logout = () => {
    localStorage.clear();
    setNome("");
  };
  return width >= 999 ? (
    <nav>
      <div className="nav-wrapper">
        <div id="logomenu">
          <Link id="menuitem" to="/">
            <img id="logo" alt="logo" src={logodotei}></img>
          </Link>

          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {nome !== "" ? (
              <div>
                <li>
                  <ul>
                    <li>
                      <Link id="menuitem" to="/admin">
                        Admin
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link id="menuitem" to="/perfil">
                    perfil de {nome}
                  </Link>
                </li>
                <li>
                  <Link id="menuitem" to="/" onClick={() => logout()}>
                    sair
                  </Link>
                </li>
              </div>
            ) : (
              <div>
                <li>
                  <Link id="menuitem" to="/login">
                    Login
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  ) : (
    <div></div>
  );
}
