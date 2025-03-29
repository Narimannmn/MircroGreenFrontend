import { useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { PlantReadCreate } from "@/entities/Plant/shemas/shemas";
import { useCreatePlantType } from "@/entities/Plantype/hooks/useCreatePlantType";
import { useGetAllPlantTypes } from "@/entities/Plantype/hooks/useGetAllPlantTypes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface PlantTypeSelectProps {
  register: UseFormRegister<PlantReadCreate>;
  name: keyof PlantReadCreate;
  errors: FieldErrors<PlantReadCreate>;
  control: Control<PlantReadCreate>;
}

export const PlantTypeSelect = ({
  name,
  errors,
  control,
}: PlantTypeSelectProps) => {
  const {
    data: plantTypes,
    isLoading,
    refetch,
  } = useGetAllPlantTypes({
    page: 1,
    page_size: 100,
  });
  const { mutateAsync } = useCreatePlantType();
  const [newPlantTypeName, setNewPlantTypeName] = useState("");
  const [newPlantTypeDescription, setNewPlantTypeDescription] = useState("");

  const handleAddNewPlantType = () => {
    mutateAsync(
      {
        name: newPlantTypeName,
        description: newPlantTypeDescription,
      },
      {
        onSuccess: () => {
          setNewPlantTypeDescription("");
          setNewPlantTypeName("");
          refetch();
        },
      },
    );
  };

  if (!plantTypes) return null;

  return (
    <div className='w-full'>
      <label htmlFor='plant_type'>Тип зелени</label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            {...field} // This binds the field to react-hook-form
            required
            value={field.value || ""} // Ensure the value is set correctly
            onValueChange={(value) => field.onChange(value)} // Ensure the form value is updated
          >
            <SelectTrigger className='input w-full'>
              <SelectValue placeholder='Select' />
            </SelectTrigger>
            <SelectContent>
              {isLoading ? (
                <SelectItem value='loading'>Loading...</SelectItem>
              ) : (
                plantTypes.map((type) => (
                  <SelectItem
                    key={type.id}
                    value={type.id}
                  >
                    {type.name}
                  </SelectItem>
                ))
              )}
              <Separator className='mt-2 mb-1' />
              <div className='flex gap-2 items-end'>
                <div className='flex flex-col gap-1'>
                  <Input
                    type='text'
                    value={newPlantTypeName}
                    onChange={(e) => setNewPlantTypeName(e.target.value)}
                    className='input'
                    placeholder='Add new plant type'
                  />
                  <Input
                    type='text'
                    value={newPlantTypeDescription}
                    onChange={(e) => setNewPlantTypeDescription(e.target.value)}
                    className='input'
                    placeholder='Add new plant type description'
                  />
                </div>

                <Button
                  type='button'
                  onClick={handleAddNewPlantType}
                  className='transition-all duration-300 ease-in-out
              hover:bg-blue-600 hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              active:bg-blue-700 active:scale-95'
                >
                  Добавить тип зелени
                </Button>
              </div>
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
