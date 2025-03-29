import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreatePlant } from "@/entities/Plant/hooks/useCreatePlant";
import {
  PlantReadCreate,
  PlantReadCreateSchema,
} from "@/entities/Plant/shemas/shemas";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PlantTypeSelect } from "../PlantTypeSelect/PlantTypeSelect";

// Import the new select component

export const AddPlantModal = () => {
  const { mutate } = useCreatePlant();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PlantReadCreate>({
    resolver: zodResolver(PlantReadCreateSchema),
  });

  const onSubmit = (data: PlantReadCreate) => {
    mutate(
      {
        description: data.description,
        name: data.name,
        plant_type_id: data.plant_type_id,
        typical_days_to_harvest: data.typical_days_to_harvest,
      },
      {
        onSuccess: () => {
          reset();
          queryClient.refetchQueries({
            queryKey: ["useGetPlants"],
          });
          setOpen(false);
        },
      },
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button className='w-[200px] p-4 rounded-2xl border-2 border-gray-300 cursor-pointer'>
          Добавить
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <h2>Add a New Plant</h2>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-4'
        >
          <div>
            <label htmlFor='name'>Plant Name</label>
            <Input
              id='name'
              type='text'
              {...register("name")}
              className='input'
            />
            {errors.name && (
              <span className='text-red-500'>{errors.name.message}</span>
            )}
          </div>
          <div>
            <label htmlFor='description'>Description</label>
            <Input
              id='description'
              {...register("description")}
              className='textarea'
            />
            {errors.description && (
              <span className='text-red-500'>{errors.description.message}</span>
            )}
          </div>
          <div>
            <label htmlFor='typical_days_to_harvest'>
              Typical Days to Harvest
            </label>
            <Input
              id='typical_days_to_harvest'
              type='number'
              {...register("typical_days_to_harvest")}
              className='input'
            />
            {errors.typical_days_to_harvest && (
              <span className='text-red-500'>
                {errors.typical_days_to_harvest.message}
              </span>
            )}
          </div>
          <div>
            <PlantTypeSelect
              control={control}
              register={register}
              name='plant_type_id'
              errors={errors}
            />
          </div>
          <DialogFooter>
            <button
              type='button'
              onClick={() => setOpen(false)}
              className='button'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='button'
            >
              Submit
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
