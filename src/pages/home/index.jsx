import Conteiner from "../conteiner/Index";
import Rodape from "../footer/Rodape";
import Cabecalho from "../header/Cabecalho";


function Home() {
  return (
    <> 
      <Cabecalho/>  
      <Conteiner/>   
      <Rodape nome ="Fabio" curso="Análise e Desenvolvimento de Sistemas"/>
    </>
  );
}

export default Home;
