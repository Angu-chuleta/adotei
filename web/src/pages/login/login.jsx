import React, { useState, useEffect } from "react";
import "./login.css";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

export default function Login() {
  const history = useHistory();
  const [username, setLogin] = useState("");
  const [password, setSenha] = useState("");
  const [load, setload] = useState(false);
  const [FildErro, setFildErro] = useState(false);
  const [UserPass, setUserPass] = useState(false);

  return (
    <div className="row">
      <div className="login-container col s12 m8 offset-m2 l6 offset-l3 xl4 offset-xl4">
        <section className="form col s8 offset-s2">
          <form onSubmit={()=>{}}>
            <h1 id="adotei">Adotei</h1>

            <h3 id="bemvindo">Bem vindo!</h3>

            <h5 id="textologin">faça seu login:</h5>
            {UserPass ? (
              <span id="erro">Usuário ou Senha incorreto</span>
            ) : (
              <p></p>
            )}
            <input
              placeholder="Login"
              value={username}
              onChange={(e) => setLogin(e.target.value)}
            ></input>
            {FildErro ? <span id="erro">campo obrigatório</span> : null}

            <input
              placeholder="Senha"
              type="password"
              value={password}
              onChange={(e) => setSenha(e.target.value)}
            ></input>
            {FildErro ? <span id="erro">campo obrigatório</span> : null}
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

            <Link className="row" to="/">
              {/* <Link className="fa fa-facebook" to="/adocao"></Link>
            <Link className="fa fa-google" to="/adocao"></Link> */}
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
