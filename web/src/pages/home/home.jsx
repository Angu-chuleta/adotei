import "./home.css";
import apiService from "../../services/api.service";
import React, { useState, useEffect } from "react";
import Cabecalho from "../cabecalho/cabecalho";
import piximg from "../../assets/imagens/pix.png";
export default function Home() {
  const [pets, setPets] = useState([]);
  const [load, setload] = useState("");

  useEffect(() => {
    setload(true);

    apiService
      .get("pet")
      .then((response) => {
        setPets(response.data);
        setload(false);
      })
      .catch((e) => {
        console.log(e);
        setload(false);
      });
  }, []);

  return (
    <div>
      <Cabecalho />
      {load ? (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      ) : (
        <div className="row">
          <div className="col s12 m8 offset-m2 l4 offset-l4 home-container">
            {pets.map((pet) => (
              <div key={pet._id} className="card z-depth-4">
                <div className="card-image waves-effect waves-block waves-light">
                  <img
                    className="activator fotos"
                    src={pet.foto}
                    alt={pet.name}
                  ></img>
                </div>
                <div className="card-content">
                  <div className="row">
                    <p className="col s12 card-title activator orange-text text-darken-2">
                      Ajude o {pet.name}
                    </p>
                  </div>
                </div>
                <div className="card-reveal">
                  <h2 className="card-title orange-text text-darken-2">
                    {pet.name}

                    <i className="material-icons right">close</i>
                  </h2>
                  <h2 className=" card-title orange-text text-darken-2">
                    sobre:
                  </h2>
                  <p>{pet.sobre}</p>
                  <p>
                    {" "}
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
                  Chave PIX: <br />
                  {pet.pix}
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
