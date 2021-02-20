import React, { useEffect } from "react";
import "./perfil.css";
import Cabecalho from "../cabecalho/cabecalho";
import { useHistory } from "react-router-dom";

export default function ProfileUser() {
  const [perfil, setPerfil] = React.useState({
    bank_information: {
      pix_key: "",
    },
  });
  const history = useHistory();

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("adotei@token"));
    if (storage === null) {
      history.push("/");
    } else {
      setPerfil(storage.user);
    }
  }, [history]);

  return (
    <div>
      <Cabecalho />
      <div className="row">
        <div className="col s12 m8 offset-m2 l6 offset-l3 xl4 offset-xl4">
          <div className="row box z-depth-3">
            <div className="perfil col s8">
              <img
                className="circle responsive-img"
                id="fotoPerfil"
                alt={"foto de " + perfil.name}
                src={perfil.foto}
              ></img>
              <div className="dadosPerfil">
                <h2 id="conta">{perfil.name}</h2>
                <table>
                  <tbody>
                    <tr>
                      <td>Sobre:</td>
                      <td>{perfil.sobre}</td>
                    </tr>
                    <tr>
                      <td>email:</td>
                      <td>{perfil.email}</td>
                    </tr>
                    <tr>
                      <td>Endereço:</td>
                      <td>
                        {perfil.cidade} / {perfil.uf}
                      </td>
                    </tr>
                    <tr>
                      <td>Chave PIX:</td>
                      <td>{perfil.bank_information.pix_key}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
