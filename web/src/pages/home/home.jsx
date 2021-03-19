import "./home.css";
import apiService from "../../services/api.service";
import React, { useState, useEffect } from "react";
import Cabecalho from "../cabecalho/cabecalho";
//import piximg from "../../assets/imagens/pix.png";
export default function Home() {
  const [pets, setPets] = useState([]);
  const [spets, setSpets] = useState([]);
  const [load, setload] = useState("");

  useEffect(() => {
    setload(true);

    apiService
      .get("pet")
      .then((response) => {
        let reverse = response.data.reverse();
        setPets(reverse);
        setSpets(reverse);
        setload(false);
      })
      .catch((e) => {
        console.log(e);
        setload(false);
      });
  }, []);

  function buscaPet(query) {
    query = query.toLowerCase();
    setPets(
      spets.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.user?.name.toLowerCase().includes(query) ||
          p.user?.cidade.toLowerCase().includes(query) ||
          p.user?.uf.toLowerCase().includes(query) ||
          p.porte.toLowerCase().includes(query) ||
          p.especie.toLowerCase().includes(query)
      )
    );
  }

  return (
    <div>
      <Cabecalho />

      <div id="search" className="row">
        <div className="col s4 offset-s4">
          <nav>
            <div className="nav-wrapper">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="input-field">
                  <input
                    id="search"
                    type="search"
                    onChange={(e) => buscaPet(e.target.value)}
                  ></input>
                  <label className="label-icon" for="search">
                    <i id="menuitem" className="material-icons">
                      search
                    </i>
                  </label>
                </div>
              </form>
            </div>
          </nav>
        </div>
      </div>

      {load ? (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      ) : (
        <div className="row">
          <div className="col box s12 m8 offset-m2 l4 offset-l4 home-container">
            {pets.map((pet) => (
              <div key={pet._id} className="card border-radius z-depth-4">
                <div className="border-radius card-image waves-effect waves-block waves-light">
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
                  <p>Especie: {pet.especie}</p>
                  <h2 className=" card-title orange-text text-darken-2">
                    Doe através do PIX:
                  </h2>
                  <p>Chave PIX: {pet.user?.pix}</p>
                  <h2 className=" card-title orange-text text-darken-2">
                    Adote:
                  </h2>
                  <p> Fale com {pet.user?.name} </p>
                  <p>Email : {pet.user?.email} </p>
                  <p>Telefone: {pet.user?.telefone}</p>
                  <p>
                    localizado em {pet.user?.cidade} - {pet.user?.uf}
                  </p>
                  {/* <img width="256px" src={piximg} alt="pix" /> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
