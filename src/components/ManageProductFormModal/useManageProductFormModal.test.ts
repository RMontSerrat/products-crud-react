import { renderHook, act } from "@testing-library/react-hooks";
import { useManageProductFormModal } from "./useManageProductFormModal";
import { useHash } from "@/hooks/useHash";
import { useToast } from "@/hooks/useToast";
import { useProductsManagement } from "@/hooks/useProductsManagement";

jest.mock("@/hooks/useHash", () => ({
  useHash: jest.fn(),
}));

jest.mock("@/hooks/useToast", () => ({
  useToast: jest.fn(),
}));

jest.mock("@/hooks/useProductsManagement", () => ({
  useProductsManagement: jest.fn(),
}));

describe("useManageProductFormModal", () => {
  const mockSetHash = jest.fn();
  const mockAddToast = jest.fn();
  const mockGetProduct = jest.fn();
  const mockUseHash = useHash as jest.Mock;
  const mockUseToast = useToast as jest.Mock;
  const mockUseProductsManagement = useProductsManagement as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseHash.mockReturnValue([null, mockSetHash]);
    mockUseToast.mockReturnValue({ addToast: mockAddToast });
    mockUseProductsManagement.mockReturnValue({ getProduct: mockGetProduct });
  });

  it("should set isOpen to true when product is defined", () => {
    const mockProduct = { id: "1", name: "Product 1" };
    mockUseHash.mockReturnValue(["#product-details-1", mockSetHash]);
    mockGetProduct.mockReturnValue(mockProduct);

    const { result } = renderHook(() => useManageProductFormModal());

    expect(result.current.isOpen).toBe(true);
  });

  it("should set isOpen to true when hash is '#product-details-new'", () => {
    mockUseHash.mockReturnValue(["#product-details-new", mockSetHash]);

    const { result } = renderHook(() => useManageProductFormModal());

    expect(result.current.isOpen).toBe(true);
  });

  it("should set isOpen to false when product is null and hash is not '#product-details-new'", () => {
    const { result } = renderHook(() => useManageProductFormModal());

    expect(result.current.isOpen).toBe(false);
  });

  it("should set title to 'Editar Produto' when product is defined", () => {
    const mockProduct = { id: "1", name: "Product 1" };
    mockUseHash.mockReturnValue(["#product-details-1", mockSetHash]);
    mockGetProduct.mockReturnValue(mockProduct);

    const { result } = renderHook(() => useManageProductFormModal());

    expect(result.current.title).toBe("Editar Produto");
  });

  it("should set title to 'Adicionar Produto' when product is null", () => {
    const { result } = renderHook(() => useManageProductFormModal());

    expect(result.current.title).toBe("Adicionar Produto");
  });

  it("should set defaultValues to product when product is defined", () => {
    const mockProduct = { id: "1", name: "Product 1" };
    mockUseHash.mockReturnValue(["#product-details-1", mockSetHash]);
    mockGetProduct.mockReturnValue(mockProduct);

    const { result } = renderHook(() => useManageProductFormModal());

    expect(result.current.defaultValues).toBe(mockProduct);
  });

  it("should set defaultValues to undefined when product is null", () => {
    const { result } = renderHook(() => useManageProductFormModal());

    expect(result.current.defaultValues).toBeUndefined();
  });

  it("should call setHash with an empty string when closeModal is called", () => {
    const { result } = renderHook(() => useManageProductFormModal());

    act(() => {
      result.current.onClose();
    });

    expect(mockSetHash).toHaveBeenCalledWith("");
  });

  it("should call addToast with success message and closeModal when handleSuccess is called for a new product", () => {
    mockUseHash.mockReturnValue(["#product-details-new", mockSetHash]);

    const { result } = renderHook(() => useManageProductFormModal());

    act(() => {
      result.current.handleSuccess();
    });

    expect(mockAddToast).toHaveBeenCalledWith("Produto criado com sucesso", {
      type: "success",
    });
    expect(mockSetHash).toHaveBeenCalledWith("");
  });

  it("should call addToast with success message and closeModal when handleSuccess is called for an existing product", () => {
    const mockProduct = { id: "1", name: "Product 1" };
    mockUseHash.mockReturnValue(["#product-details-1", mockSetHash]);
    mockGetProduct.mockReturnValue(mockProduct);

    const { result } = renderHook(() => useManageProductFormModal());

    act(() => {
      result.current.handleSuccess();
    });

    expect(mockAddToast).toHaveBeenCalledWith("Produto editado com sucesso", {
      type: "success",
    });
    expect(mockSetHash).toHaveBeenCalledWith("");
  });
});
