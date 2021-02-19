import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import "./styles.css";
import Cabecalho from "../Cabecalho";
import apiService from "../../services/api";

//Incluir instituição no cadastro Pet
export default function ProfileOng() {
  const [pets, setPets] = useState([]);
  const [load, setload] = useState(true);
  const [loadbtn, setloadbtn] = useState(false);
  useEffect(() => {
    setload(true);
    apiService
      .get("pet")
      .then((response) => {
        setPets(response.data);
        setload(false);
      })
      .catch((error) => {
        setload(false);
        console.log(error);
      });
  }, []);

  async function hundleDeleteCase(pet) {
    setloadbtn(true);

    apiService
      .delete(`pet/${pet._id}`)
      .then((res) => {
        setPets(pets.filter((pets) => pets._id !== pet._id));
        setloadbtn(false);
      })
      .catch((err) => {
        setloadbtn(false);
        console.log(`Erro ao deletar: ${err}`);
      });
  }

  return (
    <div>
      <Cabecalho />

      {load ? (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      ) : (
        <div className="row">
          <div className="col s12">
            <div className="col s6 m3 l2 offset-l3 offset-m3">
              <span>Bem vindo, Usuário</span>
              <Link className="button btn waves-effect waves-light " to="/new">
                Cadastrar novo caso
              </Link>
              <h6>Casos {pets.length} cadastrados</h6>
            </div>
          </div>

          <ul className="box col s12 m8 offset-m2 l6 offset-l3 xl4 offset-xl4">
            {pets.map((pet) => (
              <li key={pet._id}>
                <div className="card z-depth-2">
                  <div className="z-depth-2 card-image waves-effect waves-block waves-light">
                    <div
                      onClick={() => hundleDeleteCase(pet)}
                      className="btnlixo col s1 offset-s10"
                    >
                      {loadbtn ? (
                        <div className="progress">
                          <div className="indeterminate"></div>
                        </div>
                      ) : (
                        <FiTrash2 size={32} color="#f2a365" />
                      )}
                    </div>

                    <img
                      className="fotos activator"
                      src={pet.foto}
                      alt={pet.name}
                    ></img>
                  </div>
                  <div className="card-content">
                    <span className="card-title activator orange-text text-darken-2">
                      {pet.name}
                    </span>
                    Carinho
                  </div>
                  <div className="card-reveal">
                    <span className="card-title orange-text text-darken-2">
                      {pet.name}
                      <i className="material-icons right">close</i>
                    </span>
                    <p>{pet.sobre}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
/*
<li>
onClick={hundleDeleteCase(pet._id)}
<strong>Caso</strong>
<p>caso Teste</p>
<strong>Descricao</strong>
<p>Descricao Teste</p>
<strong>Contato</strong>
<p>(27)4091-9240</p>
<button type="button">
    <FiTrash2 size={20} color="#a8a8b3"/>
</button>
</li>*/
