import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { LotCreate } from "@/entities/Lot/schemas/shemas";
import { useGetPlants } from "@/entities/Plant/hooks/useGetPlants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PlantSelectProps {
  register: UseFormRegister<LotCreate>;
  name: keyof LotCreate;
  errors: FieldErrors<LotCreate>;
  control: Control<LotCreate>;
}

export const PlantSelect = ({ name, errors, control }: PlantSelectProps) => {
  const { data: plants, isLoading } = useGetPlants({
    page: 1,
    page_size: 100,
  });

  if (!plants) return null;

  return (
    <div className='w-full'>
      <label htmlFor='plant_type'>Тип растения</label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            {...field}
            required
            value={`${field.value}`}
            onValueChange={(value) => field.onChange(value)}
          >
            <SelectTrigger className='input w-full'>
              <SelectValue placeholder='Select' />
            </SelectTrigger>
            <SelectContent>
              {isLoading ? (
                <SelectItem value='loading'>Loading...</SelectItem>
              ) : (
                plants.items.map((type) => (
                  <SelectItem
                    key={type.id}
                    value={type.id}
                  >
                    {type.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        )}
      />
      {errors[name] && (
        <span className='text-red-500'>{errors[name]?.message}</span>
      )}
    </div>
  );
};
