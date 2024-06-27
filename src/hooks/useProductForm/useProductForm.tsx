import { useProductsManagement } from "@/hooks/useProductsManagement";
import { IProduct } from "@/interfaces/product";
import { formatBrazilianReal } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  description: z.string().min(1, { message: "Descrição é obrigatória" }),
  quantity: z
    .number()
    .min(1, { message: "Quantidade deve ser um número inteiro positivo" }),
  price: z.string().min(1, { message: "Preço é obrigatório" }),
});

export type ProductFormInput = z.infer<typeof productSchema>;

interface useProductFormProps {
  onSuccess?: () => void;
  defaultValues?: IProduct;
}

export const useProductForm = (options?: useProductFormProps) => {
  const { onSuccess } = options ?? {};
  const normalizedDefaultValues = options?.defaultValues
    ? {
        ...options?.defaultValues,
        price: options?.defaultValues?.price
          ? formatBrazilianReal(options?.defaultValues?.price)
          : "",
      }
    : {};

  const { control, handleSubmit } = useForm<ProductFormInput>({
    resolver: zodResolver(productSchema),
    defaultValues: normalizedDefaultValues,
  });

  const { addProduct, editProduct } = useProductsManagement();

  const onSubmit = (data: ProductFormInput) => {
    const formattedData = {
      ...data,
      price: parseFloat(data.price.replace("R$ ", "").replace(",", ".")),
    };
    if (data.id) {
      editProduct(formattedData);
    } else {
      addProduct(formattedData);
    }
    onSuccess?.();
  };

  return { onSubmit, control, handleSubmit };
};
