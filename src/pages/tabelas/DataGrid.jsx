import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { randomCreatedDate, randomArrayItem } from "@mui/x-data-grid-generator";


const status = ["Em andamento", "Aguardando", "Concluido"];
const randomRole = () => {
  return randomArrayItem(status);
};

const initialRows = [
  {
    id: 1,
    tituloTarefa: "tarefa 1",
    descricaoTarefa: "descricao 1",
    dataInicioTarefa: randomCreatedDate(),
    dataFimTarefa: randomCreatedDate(),
    status: randomRole(),
  },
  {
    id: 2,
    tituloTarefa: "tarefa 2",
    descricaoTarefa: "descricao 2",
    dataInicioTarefa: randomCreatedDate(),
    dataFimTarefa: randomCreatedDate(),
    status: randomRole(),
  },

  {
    id: 3,
    tituloTarefa: "tarefa 3",
    descricaoTarefa: "descricao 3",
    dataInicioTarefa: randomCreatedDate(),
    dataFimTarefa: randomCreatedDate(),
    status: randomRole(),
  },

  {
    id: 4,
    tituloTarefa: "tarefa 4",
    descricaoTarefa: "descricao 4",
    dataInicioTarefa: randomCreatedDate(),
    dataFimTarefa: randomCreatedDate(),
    status: randomRole(),
  },

  {
    id: 5,
    tituloTarefa: "tarefa 5",
    descricaoTarefa: "descricao 5",
    dataInicioTarefa: randomCreatedDate(),
    dataFimTarefa: randomCreatedDate(),
    status: randomRole(),
  },
];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = "";
    setRows((oldRows) => [
      ...oldRows,
      { id: id, name: "", age: "", role: "", isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Adicionar
      </Button>
    </GridToolbarContainer>
  );
}

export default function ListarDataGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "id", headerName: "id", width: 180, editable: true },
    { field: "tituloTarefa", headerName: "Tarefa", width: 180, editable: true },
    {
      field: "descricaoTarefa",
      headerName: "Descrição da tarefa",
      width: 180,
      editable: true,
    },
    {
      field: "dataInicioTarefa",
      headerName: "Data Inicio",
      type: "date",
      width: 180,
      editable: true,
    },
    {
      field: "dataFimTarefa",
      headerName: "Data Fim",
      type: "date",
      width: 180,
      editable: true,
    },

    {
      field: "status",
      headerName: "Status",
      width: 220,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Em andamento", "Aguardando", "Concluido"],
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Ação",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      
      sx={{        
        bgcolor:"white",
        marginTop:"10px",
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >      
       
      <DataGrid        
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />

      
    </Box>
  );
}
