import { IProduct, IProductWithId } from "@/interfaces/product";
import { createCRUDState, useCRUD } from "../useCrud";

export const productsState = createCRUDState<IProduct>("productsState");

export const useProductsManagement = () => {
  const {
    items,
    deleteItem,
    editItem,
    getItem,
    addItem,
  } = useCRUD(productsState);

  const deleteProduct = (productId: string) => {
    deleteItem(productId);
  };

  const addProduct = (data: IProduct) => {
    addItem(data);
  };

  const editProduct = (data: IProductWithId) => {
    editItem(data);
  };

  const getProduct = (productId: string) => {
    return getItem(productId);
  };

  return {
    products: items,
    deleteProduct,
    editProduct,
    getProduct,
    addProduct,
  };
};
