import { IProduct } from "@/interfaces/product";
import { generateUniqueId } from "@/utils";
import { atom, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const productsState = atom<IProduct[]>({
  key: "productsState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const useProductsManagement = () => {
  const [products, setProducts] = useRecoilState<IProduct[]>(productsState);

  const deleteProduct = (productId: string) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  const addProduct = (data: IProduct) => {
    const newProduct = {
      id: generateUniqueId(),
      ...data,
    };
    setProducts([...products, newProduct]);
  };

  const editProduct = (data: IProduct) => {
    const newProducts = products.map((product) => {
      if (product.id === data.id) {
        return data;
      }
      return product;
    });
    setProducts(newProducts);
  };

  const getProduct = (productId: string) => {
    return products.find((product) => product.id === productId);
  }

  return {
    products,
    deleteProduct,
    editProduct,
    getProduct,
    addProduct,
  };
};
