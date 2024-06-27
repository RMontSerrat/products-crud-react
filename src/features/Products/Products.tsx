import { Box, Button, IconButton, Card } from "@mui/material";
import { Header } from "@/components/Header";
import { useProductsManagement } from "@/hooks/useProductsManagement";
import { useProducts } from "./useProducts";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ManageProductFormModal } from "@/components/ManageProductFormModal";
import { formatBrazilianReal } from "@/utils";

export function Products() {
  const { handleEdit, handleDelete, handleCreate } = useProducts();
  const { products } = useProductsManagement();

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
          <IconButton onClick={() => handleEdit(params.row.id)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div className="max-w-screen-lg mx-auto text-center w-[calc(100%-4rem)]">
      <Header>Listagem de produtos</Header>
      <Box display="flex" flexDirection="column">
        <Box display="flex" justifyContent="flex-end" mt="25px" mb="10px">
          <Button variant="contained" size="small" onClick={handleCreate}>
            Adicionar produto
          </Button>
        </Box>
      </Box>
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
      <ManageProductFormModal />
    </div>
  );
}
