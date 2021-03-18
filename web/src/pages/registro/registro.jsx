import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import apiService from "../../services/api.service";
import "./registro.css";
import ImageUploading from "react-images-uploading";
import InputMask from "react-input-mask";
import MaterialInput from "@material-ui/core/Input";
import Cabecalho from "../cabecalho/cabecalho";

export default function RegisterUser() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [foto, setFoto] = useState("");
  const [email, setEmail] = useState("");
  const [sobre, setSobre] = useState("");
  const [telefone, setTelefone] = useState("");
  const [username, setUsename] = useState("");
  const [password, setPassword] = useState("");
  const [pix, setPix] = useState("");
  const [uf, setUf] = useState("");
  const [cidade, setCidade] = useState("");
  const [load, setLoad] = useState(false);
  const [formValido, setformValido] = useState(true);
  const [images, setImages] = React.useState([]);
  const [imagesvalida, setImagesvalida] = React.useState(true);
  const [usernameErro, setUsernameErro] = React.useState(false);
  const maxNumber = 1;

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

  const confereDados = () => {
    return (
      username != "" &&
      password != "" &&
      name != "" &&
      email != "" &&
      telefone != "" &&
      sobre != "" &&
      uf != "" &&
      cidade != "" &&
      pix != ""
    );
  };
  async function SendData() {
    setLoad(true);
    const data = {
      username,
      password,
      name,
      foto,
      email,
      telefone,
      sobre,
      uf,
      cidade,
      bank_information: {
        pix_key: pix,
      },
    };
    if (!confereDados()) {
      setformValido(false);
      setLoad(false);
    } else {
      setformValido(true);
      setUsernameErro(false);
      apiService
        .post("user", data)
        .then((response) => {
          console.log("Cadastro realizado com sucesso", response.status);
          history.push("/");
          setLoad(false);
        })
        .catch((err) => {
          if (err.response.data.message) {
            setUsernameErro(true);
          } else {
            setformValido(false);
          }
          setLoad(false);
          console.log("Erro no cadastro tente novamente: ", err.response.data);
        });
    }
  }

  return (
    <div className="row">
      <Cabecalho />
      <div className="caixaRegistro col s12 m8 offset-m2 l6 offset-l3 xl4 offset-xl4">
        <section className="col s12 sectionbox">
          <div className="col offset-m3">
            <h5 id="adotei">Faça seu cadastro!</h5>
          </div>
        </section>
        <form className="col s6 offset-s3" onsubmit="return false">
          <div class="input-field">
            <input
              required
              className="validate"
              type="text"
              pattern="[A-Za-z]{*}"
              placeholder="João Silva"
              value={name}
              id="fullName"
              onChange={(e) => setName(e.target.value)}
            />
            <label for="fullName">
              Nome Completo
              {!formValido && name === "" ? (
                <span id="erro">* Campo obrigatório</span>
              ) : (
                <span></span>
              )}
            </label>
          </div>

          <div class="input-field">
            <input
              required
              pattern="[A-Za-z0-9]{*}"
              className="validate"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsename(e.target.value)}
            />
            <label for="username">
              Usuário
              {!formValido && username === "" ? (
                <span id="erro">* Campo obrigatório</span>
              ) : (
                <span></span>
              )}
              {usernameErro ? (
                <span id="erro">* Usuário já existe</span>
              ) : (
                <span></span>
              )}
            </label>
          </div>

          <div class="input-field">
            <input
              required
              id="senha"
              className="validate"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label for="senha">
              Senha
              {!formValido && password === "" ? (
                <span id="erro">* Campo obrigatório</span>
              ) : (
                <div></div>
              )}
            </label>
          </div>

          <div class="input-field">
            <input
              required
              type="text"
              id="cidade"
              className="validate"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
            />
            <label for="cidade">
              Cidade
              {!formValido && cidade === "" ? (
                <span id="erro">* Campo obrigatório</span>
              ) : (
                <div></div>
              )}
            </label>
          </div>

          <div class="input-field">
            <input
              required
              type="text"
              id="uf"
              className="validate"
              pattern="[A-Z]{2}"
              value={uf}
              onChange={(e) => setUf(e.target.value)}
            />
            <label for="uf">
              UF
              {!formValido && uf === "" ? (
                <span id="erro">* Campo obrigatório</span>
              ) : (
                <div></div>
              )}
            </label>
          </div>
          <div class="input-field">
            <input
              required
              type="text"
              id="pix"
              className="validate"
              value={pix}
              onChange={(e) => setPix(e.target.value)}
            />
            <label for="pix">
              PIX
              {!formValido && pix === "" ? (
                <span id="erro">* Campo obrigatório</span>
              ) : (
                <div></div>
              )}
            </label>
          </div>
          <div></div>
          <div class="input-field">
            <input
              id="email"
              className="validate"
              type="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />{" "}
            <label for="email">
              Email
              {!formValido && email === "" ? (
                <span id="erro">* Campo obrigatório</span>
              ) : (
                <div></div>
              )}
            </label>
          </div>

          <label>
            Telefone
            {!formValido && telefone === "" ? (
              <span id="erro">* Campo obrigatório</span>
            ) : (
              <div></div>
            )}
          </label>
          <div class="input-field">
            <InputMask
              id="tel"
              mask="(99) 9 9999 9999"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            >
              {(inputProps) => (
                <MaterialInput
                  className="validate"
                  {...inputProps}
                  id="tel"
                  type="text"
                  disableUnderline
                />
              )}
            </InputMask>

            {/* <input
              id="tel"
              type="text"
              required
              className="validate"
              pattern="[0-9]{12,}"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            /> */}
          </div>

          <div class="input-field">
            <input
              id="about"
              required
              className="validate"
              type="text"
              value={sobre}
              onChange={(e) => setSobre(e.target.value)}
            />
            <label for="about">
              Sobre você
              {!formValido && sobre === "" ? (
                <span id="erro">* Campo obrigatório</span>
              ) : (
                <div></div>
              )}
            </label>
          </div>

          <div className="App">
            {imagesvalida ? (
              <span></span>
            ) : (
              <span id="erro">Imagem maior que 1MB</span>
            )}
            <label>
              Foto de Perfil
              {!formValido && foto === "" ? (
                <span id="erro">* Campo obrigatório</span>
              ) : (
                <div></div>
              )}
            </label>
            <br />
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
                          onClick={() => onImageRemove(index)}
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
            <a
              onClick={() => SendData()}
              className="button btn waves-effect waves-light"
              name="action"
            >
              Cadastrar
            </a>
          )}
        </form>
      </div>
    </div>
  );
}
