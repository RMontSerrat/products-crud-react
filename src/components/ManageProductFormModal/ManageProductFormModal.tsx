import { Modal } from "../Modal"
import { ProductForm } from "../ProductForm"
import { useManageProductFormModal } from "./useManageProductFormModal";

export const ManageProductFormModal = () => {
  const { isOpen, onClose, title, defaultValues, handleSuccess } = useManageProductFormModal();

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Modal.Title>{title}</Modal.Title>
      <ProductForm defaultValues={defaultValues} onSuccess={handleSuccess} onCancel={onClose} />
    </Modal>
  )
}