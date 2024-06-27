import { DeleteProductModal } from "@/components/DeleteProductModal";
import { useProductsManagement } from "@/hooks/useProductsManagement";
import { useModal } from "@/hooks/useModal";
import { useToast } from "@/hooks/useToast";
import { useCallback } from "react";
import { useHash } from "@/hooks/useHash";

export function useProducts() {
  const [, setHash] = useHash();
  const { addToast } = useToast();
  const { deleteProduct } = useProductsManagement();
  const { openModal: openModalDelete, closeModal: closeModalDelete } =
    useModal();

  const handleEdit = useCallback(
    (editingProductId: string) => {
      setHash(`product-details-${editingProductId}`);
    },
    [setHash],
  );

  const handleCreate = useCallback(() => {
    setHash("product-details-new");
  }, [setHash]);

  const confirmDelete = useCallback(
    (productId: string) => {
      if (productId) {
        deleteProduct(productId);
        addToast("Produto deletado com sucesso", { type: "success" });
        closeModalDelete();
      }
    },
    [addToast, closeModalDelete, deleteProduct],
  );

  const handleDelete = useCallback(
    (productId: string) => {
      openModalDelete({
        body: (
          <DeleteProductModal
            onCancel={closeModalDelete}
            onConfirm={() => confirmDelete(productId)}
          />
        ),
      });
    },
    [confirmDelete, closeModalDelete, openModalDelete],
  );

  return {
    handleEdit,
    handleCreate,
    handleDelete,
  };
}
