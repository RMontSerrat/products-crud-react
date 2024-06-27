import { IProduct } from "@/interfaces/product";
import { createCRUDState, useCRUD } from "@/hooks/useCrud";

export const productsState = createCRUDState<IProduct>("productsState");

export const useProductsManagement = () => {
  const {
    items: products,
    deleteItem: deleteProduct,
    editItem: editProduct,
    getItem: getProduct,
    addItem: addProduct,
  } = useCRUD(productsState);


  return {
    products,
    deleteProduct,
    editProduct,
    getProduct,
    addProduct,
  };
};
