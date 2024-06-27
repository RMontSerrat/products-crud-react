import { render, screen, fireEvent } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { DeleteProductModal } from "./DeleteProductModal";
import { ToastProvider } from "@/providers/ToastProvider";
import { ModalProvider } from "@/providers/ModalProvider";

const Provider = ({ children }: { children: React.ReactNode }) => (
  <RecoilRoot>
    <ToastProvider>
      <ModalProvider>{children}</ModalProvider>
    </ToastProvider>
  </RecoilRoot>
);

test("renders DeleteProductModal component", () => {
  render(
    <Provider>
      <DeleteProductModal onCancel={() => {}} onConfirm={() => {}} />
    </Provider>,
  );

  const cancelButton = screen.getByText("Cancelar") as HTMLElement;
  const confirmButton = screen.getByText("Confirmar") as HTMLElement;

  expect(cancelButton).toBeTruthy();
  expect(confirmButton).toBeTruthy();
});

test("calls onCancel when cancel button is clicked", () => {
  const onCancelMock = jest.fn();
  render(
    <Provider>
      <DeleteProductModal onCancel={onCancelMock} onConfirm={() => {}} />
    </Provider>,
  );

  const cancelButton = screen.getByText("Cancelar") as HTMLElement;
  fireEvent.click(cancelButton);

  expect(onCancelMock).toHaveBeenCalled();
});

test("calls onConfirm when confirm button is clicked", () => {
  const onConfirmMock = jest.fn();
  render(
    <Provider>
      <DeleteProductModal onCancel={() => {}} onConfirm={onConfirmMock} />
    </Provider>,
  );

  const confirmButton = screen.getByText("Confirmar") as HTMLElement;
  fireEvent.click(confirmButton);

  expect(onConfirmMock).toHaveBeenCalled();
});
