
import { renderHook } from "@testing-library/react";
import { act } from "@testing-library/react-hooks";
import React from "react";
import { RecoilRoot } from "recoil";
import { useProductsManagement } from "./useProductsManagement";
import { productsState } from "./useProductsManagement";
jest.mock("@/hooks/useModal", () => ({
  useModal: () => ({
    openModal: jest.fn(),
  }),
}));


const mockInitialState = [
  { id: "1", name: "Product 1", description: "", quantity: 0, price: 0 },
  { id: "2", name: "Product 2", description: "", quantity: 0, price: 0 },
];

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <RecoilRoot
    initializeState={({ set }) => {
      set(productsState, mockInitialState);
    }}
  >
    {children}
  </RecoilRoot>
);

describe("useProductsManagement", () => {
  test("should add a product correctly", () => {
    const { result } = renderHook(() => useProductsManagement(), { wrapper });

    act(() => {
      result.current.addProduct({ name: "Product 3", description: "", quantity: 0, price: 0 });
    });

    expect(result.current.products.length).toEqual(3);
    expect(result.current.products[2].name).toEqual("Product 3");
  });

  test("should edit a product correctly", () => {
    const { result } = renderHook(() => useProductsManagement(), { wrapper });

    act(() => {
      result.current.editProduct({ id: "1", name: "Updated Product 1", description: "", quantity: 0, price: 0 });
    });

    expect(result.current.products.length).toEqual(3);
    expect(result.current.products[0].name).toEqual("Updated Product 1");
  });

  test("should delete a product correctly", () => {
    const { result } = renderHook(() => useProductsManagement(), { wrapper });

    act(() => {
      result.current.deleteProduct("1");
    });

    expect(result.current.products.length).toEqual(2);
    expect(result.current.products[0].id).toEqual("2");
  });
});