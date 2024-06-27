import { IconButton, Card } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatBrazilianReal } from "@/utils";
import { IProduct } from "@/interfaces/product";

interface ProductListProps {
  products: IProduct[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ProductList({ products, onEdit, onDelete }: ProductListProps) {
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Nome",
      width: 200,
      sortable: false,
      filterable: false,
    },
    {
      field: "description",
      headerName: "Descrição",
      width: 250,
      sortable: false,
      filterable: false,
    },
    {
      field: "quantity",
      headerName: "Quantidade",
      width: 150,
      sortable: false,
      filterable: false,
    },
    {
      field: "price",
      headerName: "Preço",
      width: 150,
      sortable: false,
      filterable: false,
      valueFormatter: (value: number) => formatBrazilianReal(value),
    },
    {
      field: "actions",
      headerName: "Ações",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => onEdit(params.row.id)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Card className="w-full h-[75vh] relative flex flex-col items-center justify-center">
      <div className="h-full w-full">
        <DataGrid
          rows={products}
          localeText={{
            noRowsLabel: "Nenhum registro encontrado",
            columnMenuHideColumn: "Ocultar coluna",
            columnsManagementShowHideAllText: "Mostrar/Ocultar todas",
            columnMenuManageColumns: "Gerenciar colunas",
            MuiTablePagination: {
              labelRowsPerPage: "Registros por página",
              labelDisplayedRows: ({ from, to, count }) =>
                `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`,
            },
          }}
          columns={columns}
          rowCount={products.length}
          pageSizeOptions={[10]}
        />
      </div>
    </Card>
  );
}
