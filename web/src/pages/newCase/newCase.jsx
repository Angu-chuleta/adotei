import React, { useState, useEffect } from "react";
import "./newCase.css";
import Cabecalho from "../cabecalho/cabecalho";
import { useHistory } from "react-router-dom";
import apiService from "../../services/api.service";
import ImageUploading from "react-images-uploading";

export default function NewCase() {
  const [ong, setOng] = useState([]);
  const [ongSelected, setOngSelected] = useState([]);
  const [images, setImages] = React.useState([]);
  const [load, setLoad] = useState(false);
  const [loadbtn, setLoadbtn] = useState(false);
  const [formErro, setFormErro] = useState(false);
  const maxNumber = 1;
  const [imagesvalida, setImagesvalida] = React.useState(true);
  const history = useHistory();
  const [name, setName] = useState("");
  const [foto, setFoto] = useState("");
  const [idade, setIdade] = useState("");
  const [sobre, setSobre] = useState("");
  const [porte, setPorte] = useState("");
  const foiAdotado = false;
  const onChangeImage = (imageList, addUpdateIndex) => {
    if (imageList[0] !== undefined) {
      // console.log(imageList, addUpdateIndex);
      // console.log(imageList[0].file.size / 1024 / 1024, "MB");
      if (imageList[0].file.size / 1024 / 1024 < 1) {
        setImagesvalida(true);
        setImages(imageList);
        setFoto(`${imageList[0].data_url}`);
      } else {
        setImagesvalida(false);
        // console.log(imageList[0].file.size / 1024 / 1024, "maior que 1MB");
      }
    }
  };
  const onImageRemove = () => {
    setImages([]);
    setFoto([]);
  };

  useEffect(() => {
    setLoad(true);

    apiService
      .get("institution")
      .then((response) => {
        setOng(response.data);
        setLoad(false);
      })
      .catch((error) => {
        setLoad(false);
      });
  }, []);

  function radioChange(e) {
    setOngSelected("aaa");
  }

  function radioPorte(e) {
    setPorte(e.target.value);
  }

  async function sendData() {
    const data = {
      name,
      foto,
      porte,
      sobre,
      idade,
      foiAdotado,
      institution: "5f7ce18cc254640017e3f0e7",
    };
    setFormErro(false);
    console.log(data);
    setLoadbtn(true);
    apiService
      .post("pet", data)
      .then((response) => {
        console.log(`Cadastro realizado com sucesso`, response.data);
        history.push("/admin");
        setLoadbtn(false);
      })
      .catch((error) => {
        setFormErro(true);
        setLoadbtn(false);
        console.log("Erro no cadastro tente novamente", error);
      });
  }

  return (
    <div className="row">
      <Cabecalho />
      <div>
        <div className="newcase col s12 m8 offset-m2 l6 offset-l3 xl4 offset-xl4">
          <section>
            <center><h4>Novo Animal</h4></center>
          </section>
          <form className="col s12 m8 offset-m2 l10 offset-l1">
            <input
              className="validate"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p>
              <label>
                <input
                  name="porte"
                  value="Grande"
                  type="radio"
                  onChange={radioPorte}
                />
                <span>Grande</span>
              </label>
            </p>
            <p>
              <label>
                <input
                  name="porte"
                  value="Médio"
                  type="radio"
                  onChange={radioPorte}
                />
                <span>Médio</span>
              </label>
            </p>
            <p>
              <label>
                <input
                  name="porte"
                  value="Pequeno"
                  type="radio"
                  onChange={radioPorte}
                />
                <span>Pequeno</span>
              </label>
            </p>
            {/* <input
              className="validate"
              placeholder="Idade em meses"
              type="number"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
            /> */}

            <p className="range-field">
              <label>
                idade <span id="labelidade">{idade}</span> anos{" "}
              </label>
              <input
                onChange={(e) => setIdade(e.target.value)}
                value={idade}
                type="range"
                id="test5"
                start="1"
                min="0"
                max="30"
              />
            </p>

            <label htmlFor="msg"></label>
            <textarea
              placeholder="Descrição:"
              value={sobre}
              onChange={(e) => setSobre(e.target.value)}
            />
            {/* <input
              placeholder="Link da imagem aqui!!"
              value={foto}
              onChange={(e) => setFoto(e.target.value)}
            /> */}
            {imagesvalida ? (
              <span></span>
            ) : (
              <span id="erro">Imagem maior que 1MB</span>
            )}
            <div className="App">
              <ImageUploading
                multiple
                value={images}
                onChange={onChangeImage}
                maxNumber={maxNumber}
                dataURLKey="data_url"
              >
                {({ imageList, onImageUpload, isDragging, dragProps }) => (
                  // write your building UI
                  <div className="upload__image-wrapper">
                    <a
                      className="waves-effect waves-light btn"
                      style={isDragging ? { color: "red" } : undefined}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      Adicione uma foto
                    </a>
                    &nbsp;
                    {imageList.map((image, index) => (
                      <div key={index} className="image-item">
                        <img src={image["data_url"]} alt="" width="100" />
                        <div className="image-item__btn-wrapper">
                          <button
                            className="waves-effect waves-light btn"
                            onClick={() => onImageRemove()}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ImageUploading>
            </div>
            {load ? (
              <div className="progress">
                <div className="indeterminate"></div>
              </div>
            ) : (
              <div></div>
            )}
            {!formErro ? (
              <span></span>
            ) : (
              <span id="erro">Preencha todos os campos</span>
            )}
            {loadbtn ? (
              <div className="progress">
                <div className="indeterminate"></div>
              </div>
            ) : (
              <button
                onClick={() => sendData()}
                className="button btn waves-effect waves-light"
                type="submit"
              >
                Cadastrar
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
