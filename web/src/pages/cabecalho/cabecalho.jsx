import React, { useEffect } from "react";
import logodotei from "../../assets/imagens/logodotei.png";
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
      setNome("");
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
    history.push("/login");
  };
  return width >= 999 ? (
    <nav>
      <div className="nav-wrapper">
        <div id="logomenu">
          <img id="logo" alt="logo" src={logodotei}></img>

          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {nome !== "" ? (
              <div>
                <li>
                  <ul>
                    <li>
                      <Link id="menuitem" to="/admin">
                        Admin {nome}
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link id="menuitem" to="/login" onClick={() => logout()}>
                    sair
                  </Link>
                </li>
              </div>
            ) : (
              <div>
                <li>
                  <Link id="menuitem" to="/login">
                    Longin
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
