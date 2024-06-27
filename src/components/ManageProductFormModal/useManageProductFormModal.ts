import { useProductsManagement } from "@/hooks/useProductsManagement";
import { useHash } from "@/hooks/useHash";
import { useToast } from "@/hooks/useToast";
import { useCallback } from "react";

export const useManageProductFormModal = () => {
  const [hash, setHash] = useHash();
  const { addToast } = useToast();
  const isNew = hash === "#product-details-new";
  const match = (hash as string)?.match(/#product-details-(.+)/);
  const { getProduct } = useProductsManagement();
  const product = match ? getProduct(match[1]) : null;
  const defaultValues = product ?? undefined;

  const closeModal = useCallback(() => {
    setHash("");
  }, [setHash]);

  const handleSuccess = useCallback(() => {
    try {
      if (isNew) {
        addToast("Produto criado com sucesso", { type: "success" });
      } else {
        addToast("Produto editado com sucesso", { type: "success" });
      }
      closeModal();
    } catch (error) {
      addToast("Erro ao salvar produto", { type: "error" });
    }
  }, [addToast, closeModal, isNew]);

  const isOpen = !!product || isNew;

  return {
    isOpen,
    onClose: closeModal,
    title: product ? "Editar Produto" : "Adicionar Produto",
    defaultValues,
    handleSuccess,
  };
};
