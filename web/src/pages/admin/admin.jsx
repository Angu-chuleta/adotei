import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import "./admin.css";
import Cabecalho from "../cabecalho/cabecalho";
import apiService from "../../services/api.service";

//Incluir instituição no cadastro Pet
export default function ProfileOng() {
  const [pets, setPets] = useState([]);
  const [load, setload] = useState(true);
  const [loadbtn, setloadbtn] = useState(false);
  useEffect(() => {
    setload(true);
    apiService
      .get("my-pets")
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
          <div className="box col s12 m8 offset-m2 l6 offset-l3 xl4 offset-xl4">
            <div className="col s12">
              <h3>Bem vindo</h3>
              <Link className=" button btn waves-effect waves-light " to="/new">
                Cadastrar novo caso
              </Link>
              <h6>Casos {pets.length} cadastrados</h6>
            </div>
          </div>
          <ul className="box col s12 m8 offset-m2 l6 offset-l3 xl4 offset-xl4">
            {pets.map((pet) => (
              <div key={pet._id} className="card border-radius z-depth-4">
                <div className="border-radius card-image waves-effect waves-block waves-light">
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
                    className="activator fotos"
                    src={pet.foto}
                    alt={pet.name}
                  ></img>
                </div>
                <div className="card-content border-radius">
                  <div className="row">
                    <div className="col s8">
                      <p className=" card-title activator orange-text text-darken-2">
                        {pet.name}
                      </p>
                      {!pet.foiAdotado ? (
                        <p id="disponivel" className="activator">
                          Para adoção
                        </p>
                      ) : (
                        <p id="indisponivel" className="activator">
                          Adotado
                        </p>
                      )}
                    </div>
                    <div className="col s4">
                      <a className="activator waves-effect waves-light btn">
                        Ver mais
                        <i className="material-icons left">expand_less</i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-reveal">
                  <h2 className="card-title orange-text text-darken-2">
                    {pet.name} <i className="material-icons right">close</i>
                  </h2>
                  <h2 className=" card-title orange-text text-darken-2">
                    sobre:
                  </h2>{" "}
                  <p>{pet.sobre}</p>
                  <p>
                    {pet.idade === 1 ? (
                      <p>Idade: {pet.idade} ano</p>
                    ) : (
                      <p>Idade: {pet.idade} anos</p>
                    )}
                  </p>
                  <p>Porte: {pet.porte}</p>
                  {/* <p>Especie: {pet.especie}</p> */}
                </div>
              </div>
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
