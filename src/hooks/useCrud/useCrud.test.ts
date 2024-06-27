import { useCRUD } from "./useCrud";
import { useRecoilState } from "recoil";

// Mock the generateId function to return a predictable value
jest.mock("@/utils", () => ({
  generateUniqueId: jest.fn().mockReturnValue("mock-id"),
}));

jest.mock("recoil", () => ({
  useRecoilState: jest.fn(),
}));

describe("useCRUD", () => {
  const mockItems = [
    { id: "1", name: "Item 1" },
    { id: "2", name: "Item 2" },
    { id: "3", name: "Item 3" },
  ];

  const mockSetItems = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRecoilState as jest.Mock).mockImplementation(() => [
      mockItems,
      mockSetItems,
    ]);
  });

  it("should delete an item", () => {
    const { deleteItem } = useCRUD("mockCrudState", jest.fn());
    const itemId = "2";

    deleteItem(itemId);

    expect(mockSetItems).toHaveBeenCalledWith(
      mockItems.filter((item) => item.id !== itemId),
    );
  });

  it("should add an item", () => {
    const { addItem } = useCRUD(
      "mockCrudState",
      jest.fn().mockReturnValue("mock-id"),
    );
    const newItem = { name: "New Item" };

    addItem(newItem);

    expect(mockSetItems).toHaveBeenCalledWith([
      ...mockItems,
      { id: "mock-id", ...newItem },
    ]);
  });

  it("should edit an item", () => {
    const { editItem } = useCRUD("mockCrudState", jest.fn());
    const updatedItem = { id: "2", name: "Updated Item" };

    editItem(updatedItem);

    const expectedItems = mockItems.map((item) =>
      item.id === updatedItem.id ? updatedItem : item,
    );
    expect(mockSetItems).toHaveBeenCalledWith(expectedItems);
  });

  it("should get an item", () => {
    const { getItem } = useCRUD("mockCrudState", jest.fn());
    const itemId = "2";

    const result = getItem(itemId);

    expect(result).toEqual(mockItems.find((item) => item.id === itemId));
  });
});
