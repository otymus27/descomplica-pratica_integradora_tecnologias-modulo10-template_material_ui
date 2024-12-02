import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import CriarTarefa from './CriarTarefa';
import EditarTarefa from './EditarTarefa';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';


const columns = [
  { field: 'idTarefa', headerName: 'ID', width: 90 },
  { field: 'tituloTarefa',headerName: 'Nome da tarefa',width: 150,editable: true,},
  { field: 'descricaoTarefa',headerName: 'Descrição',width: 150,editable: true,},
  { field: 'inicioTarefa', headerName: 'Data de Início', type: 'number', width: 110, editable: true,},
  { field: 'fimTarefa',headerName: 'Data de Finalização',type: 'number',width: 110, editable: true,},
  { field: 'statusTarefa',headerName: 'Status da Tarefa',type: 'number', width: 110,editable: true,},  
];

const initialRows = [
  {idTarefa: 1, tituloTarefa:'Tarefa 1', descricaoTarefa:'Descricao 1', inicioTarefa:'2022-01-01',fimTarefa:'2022-01-02', statusTarefa:'Concluida', },
  {idTarefa: 2, tituloTarefa:'Tarefa 2', descricaoTarefa:'Descricao 2', inicioTarefa:'2022-01-12',fimTarefa:'2022-02-02', statusTarefa:'Em andamento', },
  {idTarefa: 3, tituloTarefa:'Tarefa 3', descricaoTarefa:'Descricao 3', inicioTarefa:'2022-01-13',fimTarefa:'2022-03-02', statusTarefa:'Concluida', },
  {idTarefa: 4, tituloTarefa:'Tarefa 4', descricaoTarefa:'Descricao 4', inicioTarefa:'2022-01-01',fimTarefa:'2022-01-02', statusTarefa:'Aguardando', }
]



//Componente ListarTarefa
const ListarTarefa = () => {
  const [open, setOpen] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [tarefa, setTarefa] = useState();
  const [idTarefaSelecionada, setIdTarefaSelecionada] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenEditar = () => setOpenEditar(true);
  const handleCloseEditar = () => setOpenEditar(false);

  //O array definido acima é setado como conteúdo do state Tarefas na renderização inicial do componente.
  useEffect(() => {
    setTarefas(initialRows);
  },[]);

  const handleEditar = (idTarefa) => {
    setIdTarefaSelecionada(idTarefa);

    //Objeto local para armazenamento da tarefa filtrada de acordo com a seleção do usuário
    let tarefaParaEditar = tarefas.filter(obj => {
      return obj.idTarefa === idTarefa;
    })[0];

    //Atribuição do Objeto local, setado acima, ao state Tarefa
    setTarefa(tarefaParaEditar);

    //Seta como true o state responsável pela exibição do Model de Editar Tarefa
    setOpenEditar(true)
  };

  const handleDeletar = (idTarefa) => {
    setTarefas(current =>
      current.filter(tarefa => {
        return tarefa.idTarefa !== idTarefa;
      }),
    );
  };

    return(
    <>
    <Card>    
          
        <CardContent>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Título</TableCell>
                    <TableCell align="right">Descrição</TableCell>
                    <TableCell align="right">Data de Início</TableCell>
                    <TableCell align="right">Data de Finalização</TableCell>
                    <TableCell align="right">Status</TableCell>                    
                    <TableCell align="left"></TableCell>
                    <TableCell align="left"></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {tarefas.map((row, indice) => (
                    <TableRow
                    key={indice}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                          {row.idTarefa}
                      </TableCell>
                      <TableCell component="th" scope="row">
                          {row.tituloTarefa}
                      </TableCell>
                      <TableCell align="right">{row.descricaoTarefa}</TableCell>
                      <TableCell align="right">{row.inicioTarefa}</TableCell>
                      <TableCell align="right">{row.fimTarefa}</TableCell>
                      <TableCell align="right">{row.statusTarefa}</TableCell>                      
                      <TableCell align="center">
                        <Button variant="contained" color="success" onClick={() => handleEditar(row.idTarefa)}><EditIcon fontSize="small" /></Button>            
                      </TableCell>
                      <TableCell align="center">
                        <Button variant="contained" color="error" onClick={() => handleDeletar(row.idTarefa)}><DeleteIcon fontSize="small" /></Button>            
                      </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </CardContent>
        <CardActions>
            <Button size="small" variant="contained" onClick={handleOpen}>Criar Tarefa</Button>
            <Button size="small" variant="outlined">Cancelar</Button>
      </CardActions> 
    </Card>   
    
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <CriarTarefa handleClose={handleClose} tarefas={tarefas} setTarefas={setTarefas} />
        </div>
      </Modal>  
    </div>
    <div>
      <Modal
        open={openEditar}
        onClose={handleCloseEditar}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <EditarTarefa handleCloseEditar={handleCloseEditar} idTarefaSelecionada={idTarefaSelecionada} tarefas={tarefas} tarefa={tarefa} setTarefas={setTarefas} />
        </div>
      </Modal>  
    </div>
  </>    
 );
};
 
export default ListarTarefa;