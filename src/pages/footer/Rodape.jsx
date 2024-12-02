import React from "react"

function Rodape(props) {
    return(
      <footer className="footer">
        <p>Faculdade Descomplica &copy; Desenvolvido por {props.nome} - {props.curso} - 2024</p>
      </footer>      
    )
}

export default Rodape
