import "./home.css";
import apiService from "../../services/api.service";
import React, { useState, useEffect } from "react";
import Cabecalho from "../cabecalho/cabecalho";
//import piximg from "../../assets/imagens/pix.png";
export default function Home() {
  const [pets, setPets] = useState([]);
  const [spets, setSpets] = useState([]);
  const [load, setload] = useState("");
  const [search, setSearch] = React.useState(false);

  useEffect(() => {
    setload(true);

    apiService
      .get("pet")
      .then((response) => {
        setPets(response.data);
        setSpets(response.data);
        setload(false);
      })
      .catch((e) => {
        console.log(e);
        setload(false);
      });
  }, []);

  function buscaPet(query) {
    console.log(query);
    setPets(
      spets.filter(
        (p) =>
          p.name.includes(query.value) ||
          p.sobre.includes(query.value) ||
          p.tamanho === query.value
      )
    );
  }

  return (
    <div>
      <Cabecalho />

      <div id="search" className="row">
        <div className="col s4 offset-s4">
          <nav>
            <div class="nav-wrapper">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div class="input-field">
                  <input
                    id="search"
                    type="search"
                    onChange={(e) => buscaPet(e)}
                  ></input>
                  <label class="label-icon" for="search">
                    <i id="menuitem" class="material-icons">
                      search
                    </i>
                  </label>
                  <i
                    id="menuitem"
                    onClick={() => setSearch(!search)}
                    onBlur={() => setSearch(!search)}
                    class="material-icons"
                  >
                    close
                  </i>
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
                        Ver mais<i class="material-icons left">expand_less</i>
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
