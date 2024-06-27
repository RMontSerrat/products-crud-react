import { render, screen, fireEvent } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { ProductForm } from "./ProductForm";

test("renders ProductForm component", () => {
  render(
    <RecoilRoot>
      <ProductForm onCancel={() => {}} />
    </RecoilRoot>,
  );

  const cancelButton = screen.getByText("Cancelar") as HTMLElement;

  expect(cancelButton).toBeTruthy();
});

test("calls onCancel when cancel button is clicked", () => {
  const onCancelMock = jest.fn();
  render(
    <RecoilRoot>
      <ProductForm onCancel={onCancelMock} />
    </RecoilRoot>,
  );

  const cancelButton = screen.getByText("Cancelar") as HTMLElement;
  fireEvent.click(cancelButton);

  expect(onCancelMock).toHaveBeenCalled();
});
