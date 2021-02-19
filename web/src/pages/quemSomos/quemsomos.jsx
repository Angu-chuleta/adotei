import "./quemsomos.css";
import Cabecalho from "../cabecalho/cabecalho";
import logosquad from "../../assets/imagens/logosquad.svg";
import { Link } from "react-router-dom";
export default function QuemSomos() {


  return (
    <div>
      <Cabecalho/>
      <Link to="/"><center><img  src={logosquad}/></center></Link>
      <div> O Adotei é um site parceiro das ONGs de adoção de animais, nosso intuito é ajudar os pets, a conseguir um lar. 🐱 🐶 🐎 🐖 🐢 🦎
      </div>
    </div>
  );
}
