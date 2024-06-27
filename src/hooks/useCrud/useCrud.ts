import { generateUniqueId } from "@/utils";
import { atom, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const createCRUDState = <T extends { id?: string }>(key: string) => {
  return atom<T[]>({
    key,
    default: [],
    effects_UNSTABLE: [persistAtom],
  });
};

export const useCRUD = <T extends { id: string }>(crudState: any) => {
  const [items, setItems] = useRecoilState<T[]>(crudState);

  const deleteItem = (itemId: string) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  const addItem = (data: Omit<T, "id">) => {
    const newItem = {
      id: generateUniqueId(),
      ...data,
    } as T;
    setItems([...items, newItem]);
  };

  const editItem = (data: T) => {
    const newItems = items.map((item) => (item.id === data.id ? data : item));
    setItems(newItems);
  };

  const getItem = (itemId: string) => {
    return items.find((item) => item.id === itemId);
  };

  return {
    items,
    deleteItem,
    editItem,
    getItem,
    addItem,
  };
};
