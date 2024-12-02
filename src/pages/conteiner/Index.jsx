import React from "react";
import styles from "./Conteiner.module.css";
import ListarTarefa from "../tarefa/ListarTarefa";
import ListarDataGrid from "../tabelas/DataGrid";

function Conteiner() {
  return (
    <section className={styles.conteiner}>
      <h1>Listando tarefas - usando Data Table</h1>
      <ListarTarefa />
      <h1>Listando tarefas - usando Data Grid</h1>
      <ListarDataGrid />
    </section>
  );
}

export default Conteiner;
