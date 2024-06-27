import { render, screen } from "@testing-library/react";
import { ProductList } from "./ProductList";

const mockProducts = [
  {
    id: "1",
    name: "Product 1",
    description: "Description 1",
    quantity: 10,
    price: 9.9,
  },
  {
    id: "2",
    name: "Product 2",
    description: "Description 2",
    quantity: 20,
    price: 19.9,
  },
];

const mockOnEdit = jest.fn();
const mockOnDelete = jest.fn();

describe("ProductList", () => {
  test("should render product list with correct columns", () => {
    render(
      <ProductList
        products={mockProducts}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />,
    );

    const nameColumn = screen.getByText("Nome");
    const descriptionColumn = screen.getByText("Descrição");
    const quantityColumn = screen.getByText("Quantidade");
    const priceColumn = screen.getByText("Preço");
    const actionsColumn = screen.getByText("Ações");

    expect(nameColumn).toBeTruthy();
    expect(descriptionColumn).toBeTruthy();
    expect(quantityColumn).toBeTruthy();
    expect(priceColumn).toBeTruthy();
    expect(actionsColumn).toBeTruthy();
  });

  test("should render product list with correct data", () => {
    render(
      <ProductList
        products={mockProducts}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />,
    );

    const product1Name = screen.getByText("Product 1");
    const product1Description = screen.getByText("Description 1");
    const product1Quantity = screen.getByText("10");
    const product1Price = screen.getByText("R$ 9,90");
    const product2Name = screen.getByText("Product 2");
    const product2Description = screen.getByText("Description 2");
    const product2Quantity = screen.getByText("20");
    const product2Price = screen.getByText("R$ 19,90");

    expect(product1Name).toBeTruthy();
    expect(product1Description).toBeTruthy();
    expect(product1Quantity).toBeTruthy();
    expect(product1Price).toBeTruthy();
    expect(product2Name).toBeTruthy();
    expect(product2Description).toBeTruthy();
    expect(product2Quantity).toBeTruthy();
    expect(product2Price).toBeTruthy();
  });
});
