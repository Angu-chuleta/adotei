import React, { useState, useEffect } from "react";
import "./login.css";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import apiSevice from "../../services/api.service";
import logosquad from "../../assets/imagens/logosquad.svg";
import Cabecalho from "../cabecalho/cabecalho";

export default function Login() {
  const history = useHistory();
  const [username, setLogin] = useState("");
  const [password, setSenha] = useState("");
  const [load, setload] = useState(false);
  const [FildErro, setFildErro] = useState(false);
  const [UserPass, setUserPass] = useState(false);

  useEffect(() => {
    let store = JSON.parse(localStorage.getItem("adotei@token"));
    if (store !== null) {
      history.push("/adocao");
    }
  }, [history]);

  async function handleLogin(e) {
    e.preventDefault();
    setUserPass(false);
    setFildErro(false);
    if (username !== "" || password !== "") {
      setload(true);

      apiSevice
        .post("/auth/login", {
          username,
          password,
        })
        .then((response) => {
          localStorage.clear();
          localStorage.setItem("adotei@token", JSON.stringify(response.data));
          localStorage.setItem(
            "adotei@perfil",
            JSON.stringify(response.data.user)
          );
          history.push("/");
          setload(false);
        })
        .catch((err) => {
          setload(false);
          console.log(err);
          setUserPass(true);
          //alert("Erro ao logar: verifique seu login e senha!");
        });
    } else {
      setFildErro(true);
    }
  }

  return (
    <div className="row">
      <Cabecalho />

      <div className="login-container col s12 m8 offset-m2 l6 offset-l3 xl4 offset-xl4">
        <div className="col s12"></div>
        <section className="form col s8 offset-s2">
          <form onSubmit={handleLogin}>
            <h3 id="bemvindo">Bem vindo!</h3>
            <h5 id="textologin">faça seu login:</h5>
            {UserPass ? (
              <span id="erro">Usuário ou Senha incorreto</span>
            ) : (
              <p></p>
            )}
            <div class="input-field">
              <input
                required
                type="text"
                className="validate"
                id="username"
                placeholder="Login"
                value={username}
                onChange={(e) => setLogin(e.target.value)}
              ></input>{" "}
              <label for="username">Usuário</label>
            </div>
            <div class="input-field">
              <input
                required
                id="pass"
                className="validate"
                placeholder="Senha"
                type="password"
                value={password}
                onChange={(e) => setSenha(e.target.value)}
              ></input>
              <label for="pass">Senha</label>
            </div>
            {!load ? (
              <button
                className={"button btn waves-effect waves-light"}
                type="submit"
              >
                Entrar
              </button>
            ) : (
              <div className="progress">
                <div className="indeterminate"></div>
              </div>
            )}
            <Link className="row" to="/registro">
              <div className="col s12">
                <FiLogIn size={16} color="#3b5998" />
                <span id="cadastro">Cadastrar</span>
              </div>
            </Link>
          </form>
        </section>
      </div>
    </div>
  );
}
//flex-direction: column;
//<button className="button" type='submit'>Entrar</button>
