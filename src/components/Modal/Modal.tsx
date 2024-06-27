import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Typography } from "@mui/material";
import ModalBase from "@mui/material/Modal";
import React from "react";

interface CustomModalProps {
  children?: React.ReactNode;
  onClose: () => void;
  open: boolean;
}

function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <IconButton
      onClick={onClose}
      className="absolute top-2 right-2"
      sx={{ position: "absolute " }}
    >
      <CloseIcon />
    </IconButton>
  );
}

export function Modal({ children, onClose, open }: CustomModalProps) {
  return (
    <ModalBase open={open} onClose={onClose}>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-10 flex flex-col gap-2 items-center w-auto max-w-sm md:max-w-md">
        <CloseButton onClose={onClose} />
        {children}
      </div>
    </ModalBase>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Typography color="black" variant="h5" align="center">
        {children}
      </Typography>
    </div>
  );
}

function Actions({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-2 mt-5">{children}</div>;
}

Modal.Title = Title;
Modal.Actions = Actions;
Modal.IconContainer = Actions;
