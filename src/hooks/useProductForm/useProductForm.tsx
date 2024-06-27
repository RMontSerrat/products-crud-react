import { useProductsManagement } from "@/hooks/useProductsManagement";
import { IProduct } from "@/interfaces/product";
import { formatBrazilianReal, fromBrazilianReal } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  description: z.string().min(1, { message: "Descrição é obrigatória" }),
  quantity: z.number().min(0, { message: "Quantidade é obrigatório" }),
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
        ...options.defaultValues,
        price: formatBrazilianReal(options.defaultValues.price),
      }
    : {
        name: "",
        description: "",
        quantity: 0,
        price: "",
      };

  const { control, handleSubmit } = useForm<ProductFormInput>({
    resolver: zodResolver(productSchema),
    defaultValues: normalizedDefaultValues,
  });

  const { addProduct, editProduct } = useProductsManagement();

  const onSubmit = (data: ProductFormInput) => {
    const formattedData = {
      ...data,
      price: fromBrazilianReal(data.price),
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
