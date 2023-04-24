import { BsSearch } from "react-icons/bs";
import {useState} from 'react'
import './style.css'
import api from './services/api'

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

 async  function Pesq(){
    if(input ===''){
      alert('preencha o CEP') 
      return;
    }

    try{
      const response = await  api.get(`${input}/json`)
      setCep(response.data)
      setInput('')


    }
    catch{
      alert("Erro ao buscar")
      setInput('')
    }
  }

  return (
    <div className="container">
      <h1 className="title" >Buscador CEP</h1>

    <div className="containerInput">
      <input 
      type="text"
      placeholder="Digite seu CEP"
      value={input}
      onChange={(e)=> setInput(e.target.value)}
      />
      <button className="btnPesq" onClick={Pesq}> 
        <BsSearch size={25} color="#fff"/>
        </button>
    </div>

    
    {Object.keys(cep).length>0 && (
        <main className="main">


        <h2>CEP: {cep.cep}</h2>

        <span>Rua:{cep.logradouro}</span>
        <span>Bairro: {cep.bairro}</span>
        <span>Cidade: {cep.localidade}</span>
        <span>Estado: {cep.uf}</span>

      </main>
    )}


    </div>

  );
}

export default App;
