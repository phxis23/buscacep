//Bloco de importações do código
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import './style.css'; //importando o estilo da página
import api from "./services/api" //importando api  

function App() {

  const [input, setInput] = useState(''); //Serve para pegarmos o valor atual e utilizarmos dentro da nossa aplicação
  const [cep, setCEP] = useState({}); //Objeto vazio, recebendo via api

  //Função assícrona
  async function handleSearch(){ 

    if(input === ''){ //Verificando se o usuário preencheu o campo do CEP 
      alert("Preencha algum CEP!") //Se estiver vazio, aparecerá esse alerta!
      return; //Retorna o erro
    } 

  try{  //Executar o que o usuário quer que aconteça
  const response = await api.get(`${input}/json`) //Receber o valor da api
    setCEP(response.data) //Guarda a variável
    setInput("") //Zera o valor do input
  }catch{ //Responsáveis por validar ou informar algum erro da função
    alert("Erro ao buscar CEP!")//Alerta caso der algum erro
    setInput("") //Zera o input
 }

}
  return ( //Retornando uma página de HTML
  <div className="container">
  <h1 className="title">Buscador CEP</h1> 
  
  <div className="containerInput"> 
    <input 
       type="text"//Informa o texto
       placeholder="Digite seu CEP..."//É o texto que fica antes de digitar alguma coisa
       value={input}//Valor do input
       onChange={(e) => setInput(e.target.value)}//Captura tudo que vai ser digitado pelo usuário
   />
  
  <button className="buttonSearch" onClick={handleSearch}> 
      <FiSearch size={25} color="#FFF"/>
    </button> 

 
  </div>
   {Object.keys(cep).length > 0 && ( //Verifica se o tamanho do objeto CEP é maior do que 0, se for maior do que 0, enderiza, se não, não renderiza
    <main className="main"> 
      <h2>CEP: {cep.cep}</h2>
      <span>Rua: {cep.logradouro}</span> 
      <span>Complemento: {cep.complemento}</span>
      <span>Bairro: {cep.bairro}</span>
      <span>{cep.localidade} - {cep.uf}</span>
    </main> 
  )} 
   
  </div> //Finaliza a div
  );
} 
  
export default App; //Exporta o app. Se não exportar o app, a aplicação não funciona
  
