import { useProductForm } from "@/hooks/useProductForm";
import { Button, TextField, InputAdornment } from "@mui/material";
import { IProduct } from "@/interfaces/product";
import { Controller } from "react-hook-form";
import { formatBrazilianReal, formatCurrency } from "@/utils";

interface ProductFormProps {
  defaultValues?: IProduct;
  onSuccess?: () => void;
  onCancel: () => void;
}

export function ProductForm({
  defaultValues,
  onSuccess,
  onCancel,
}: ProductFormProps) {
  const { control, handleSubmit, onSubmit } = useProductForm({
    defaultValues,
    onSuccess,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 mt-5 items-center justify-center w-full"
    >
      <div className="flex flex-col gap-4 w-full">
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              variant="outlined"
              fullWidth
              label="Nome"
              error={!!error?.message}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              variant="outlined"
              fullWidth
              label="Descrição"
              error={!!error?.message}
              helperText={error?.message}
              multiline
              rows={4}
            />
          )}
        />
        <div className="flex gap-4 w-full">
          <Controller
            name="quantity"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                variant="outlined"
                fullWidth
                label="Quantidade"
                error={!!error?.message}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  field.onChange(Number(value));
                }}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name="price"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                variant="outlined"
                fullWidth
                label="Preço"
                error={!!error?.message}
                helperText={error?.message}
                InputProps={{
                  startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                }}
                onChange={(e) => {
                  const value = e.target.value;
                  const numericValue = parseInt(value.replace(/\D/g, ""), 10);
                  field.onChange((formatBrazilianReal(numericValue / 100)));
                }}
                value={formatCurrency(field.value?.toString())}
              />
            )}
          />
        </div>
        <div className="flex gap-4 mt-4 w-full">
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={onCancel}
            className="w-1/2"
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            className="w-1/2"
          >
            Enviar
          </Button>
        </div>
      </div>
    </form>
  );
}
