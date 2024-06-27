import { renderHook, act } from "@testing-library/react-hooks";
import { useProductForm } from "./useProductForm";
import { useForm } from "react-hook-form";
import { useProductsManagement } from "../useProductsManagement/useProductsManagement";

jest.mock("react-hook-form");
jest.mock("../useProductsManagement/useProductsManagement");

describe("useProductForm", () => {
  const mockOnSuccess = jest.fn();
  const mockDefaultValues = {
    id: "1",
    name: "Product 1",
    description: "Description 1",
    quantity: 10,
    price: 9.9,
  };

  beforeEach(() => {
    (useForm as jest.Mock).mockReturnValue({
      control: {},
      handleSubmit: jest.fn(),
    });
    (useProductsManagement as jest.Mock).mockReturnValue({
      addProduct: jest.fn(),
      editProduct: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should call addProduct when id is not provided", () => {
    const { result } = renderHook(() =>
      useProductForm({ onSuccess: mockOnSuccess }),
    );
    const { onSubmit } = result.current;

    act(() => {
      onSubmit({
        id: undefined,
        name: "Product 1",
        description: "Description 1",
        quantity: 10,
        price: "R$ 9,99",
      });
    });

    expect(useProductsManagement().addProduct).toHaveBeenCalledWith({
      name: "Product 1",
      description: "Description 1",
      quantity: 10,
      price: 9.99,
    });
    expect(mockOnSuccess).toHaveBeenCalled();
  });

  test("should call editProduct when id is provided", () => {
    const { result } = renderHook(() =>
      useProductForm({
        onSuccess: mockOnSuccess,
        defaultValues: mockDefaultValues,
      }),
    );
    const { onSubmit } = result.current;

    act(() => {
      onSubmit({
        id: "1",
        name: "Product 2",
        description: "Description 2",
        quantity: 20,
        price: "R$ 19,99",
      });
    });

    expect(useProductsManagement().editProduct).toHaveBeenCalledWith({
      id: "1",
      name: "Product 2",
      description: "Description 2",
      quantity: 20,
      price: 19.99,
    });
    expect(mockOnSuccess).toHaveBeenCalled();
  });
});
