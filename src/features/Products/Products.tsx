import { Button } from "@mui/material";
import { Header } from "@/components/Header";
import { useProductsManagement } from "@/hooks/useProductsManagement";
import { ManageProductFormModal } from "@/components/ManageProductFormModal";
import { ProductList } from "@/components/ProductList";
import { useProducts } from "./useProducts";

export function Products() {
  const { handleEdit, handleDelete, handleCreate } = useProducts();
  const { products } = useProductsManagement();

  return (
    <div className="max-w-screen-lg mx-auto text-center w-[calc(100%-4rem)]">
      <Header>Listagem de produtos</Header>
      <div className="flex flex-col">
        <div className="flex justify-end mt-6 mb-2.5">
          <Button variant="contained" onClick={handleCreate}>
            Adicionar produto
          </Button>
        </div>
      </div>
      <ProductList
        products={products}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <ManageProductFormModal />
    </div>
  );
}
