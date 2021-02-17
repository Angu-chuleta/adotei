import "./home.css";
import apiService from "../../services/api.service";
import React, { useState, useEffect } from "react";
import Cabecalho from "../cabecalho/cabecalho";

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
          <div className="col s12 m8 offset-m2 l6 offset-l3 home-container">
            {pets.map((pet) => (
              <div key={pet._id} className="card z-depth-3">
                <div className="card-image waves-effect waves-block waves-light">
                  <img
                    className="activator fotos"
                    src={pet.foto}
                    alt={pet.name}
                  ></img>
                </div>
                <div className="card-content">
                  <div className="row">
                    <p className="col s11 card-title activator orange-text text-darken-2">
                      {pet.name}
                    </p>
                    <button className="col btn-floating btn-large waves-effect waves-light red">
                      <i className="carinho material-icons">favorite</i>
                    </button>
                  </div>
                </div>
                <div className="card-reveal">
                  <span className="card-title orange-text text-darken-2">
                    {pet.name}
                    <i className="material-icons right">close</i>
                  </span>
                  <p>{pet.sobre}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
