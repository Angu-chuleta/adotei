import React, { useEffect } from "react";
import "./perfil.css";
import Cabecalho from "../cabecalho/cabecalho";
import { FaHandHoldingHeart } from "react-icons/fa";
import apiService from "../../services/api.service";
import { useHistory } from "react-router-dom";

export default function ProfileUser() {
  const [perfil, setPerfil] = React.useState({});
  const history = useHistory();
  const [load, setload] = React.useState("");

  async function addCredito() {
    apiService
      .post(`/user/${perfil._id}/addcredit`, { credito: 1 })
      .then(() => {
        apiService
          .get(`/user/${perfil._id}/`)
          .then((r) => {
            // console.log(r.data);
            setPerfil(r.data);
            localStorage.setItem("adotei@perfil", JSON.stringify(r.data));
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("adotei@token"));
    if (storage === null) {
      history.push("/");
    } else {
      setload(true);
      apiService
        .get(`/user/${storage.user._id}/`)
        .then((r) => {
          // console.log(r.data);
          setPerfil(r.data);
          localStorage.setItem("adotei@perfil", JSON.stringify(r.data));
          setload(false);
        })
        .catch((error) => {
          console.log(error);
          setload(false);
        });
    }
  }, [history]);

  return (
    <div>
      <Cabecalho />
      <div className="row">
        {load ? (
          <div className="progress">
            <div className="indeterminate"></div>
          </div>
        ) : (
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
                        <td>Pix:</td>
                        <td>{perfil.telefone}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
