import { Modal } from "@/components/Modal";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Button } from "@mui/material";

interface DeleteProductModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteProductModal({
  onCancel,
  onConfirm,
}: DeleteProductModalProps) {
  return (
    <>
      <WarningAmberIcon color="warning" fontSize="large" />
      <Modal.Title>Tem certeza que deseja deletar esse produto?</Modal.Title>
      <Modal.Actions>
        <Button onClick={onCancel} variant="outlined">
          Cancelar
        </Button>
        <Button variant="contained" color="primary" onClick={onConfirm}>
          Confirmar
        </Button>
      </Modal.Actions>
    </>
  );
}
