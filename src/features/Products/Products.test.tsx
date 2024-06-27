import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { ToastProvider } from "@/providers/ToastProvider";
import { ModalProvider } from "@/providers/ModalProvider";
import { Products } from "./Products";

test("renders Products component", () => {
  render(
    <RecoilRoot>
      <ToastProvider>
        <ModalProvider>
          <Products />
        </ModalProvider>
      </ToastProvider>
    </RecoilRoot>,
  );

  const nameColumn = screen.getByText("Nome") as HTMLElement;
  const descriptionColumn = screen.getByText("Descrição") as HTMLElement;
  const quantityColumn = screen.getByText("Quantidade") as HTMLElement;
  const priceColumn = screen.getByText("Preço") as HTMLElement;
  const actionsColumn = screen.getByText("Ações") as HTMLElement;

  expect(nameColumn).toBeTruthy();
  expect(descriptionColumn).toBeTruthy();
  expect(quantityColumn).toBeTruthy();
  expect(priceColumn).toBeTruthy();
  expect(actionsColumn).toBeTruthy();
});
