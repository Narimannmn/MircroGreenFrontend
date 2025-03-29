import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateLot } from "@/entities/Lot/hooks/useCreateLot";
import { LotCreate, LotCreateSchema } from "@/entities/Lot/schemas/shemas";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PlantSelect } from "../PlantSelect/PlantSelect";

// ✅ import PlantSelect

export const AddLotModal = () => {
  const { mutateAsync } = useCreateLot();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<LotCreate>({
    resolver: zodResolver(LotCreateSchema),
  });

  const onSubmit = async (data: LotCreate) => {
    try {
      await mutateAsync({
        date_planted: data.date_planted,
        plant_id: data.plant_id,
        soil_number: +data.soil_number,
        type_of_soil: data.soil_number,
        date_harvested: data.date_harvested,
      });
      reset();
      queryClient.refetchQueries({
        queryKey: ["useGetLots"],
      });
      setOpen(false);
    } catch (error) {
      console.error("Failed to create lot", error);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button className='w-[200px] p-4 rounded-md border-2 border-gray-300 cursor-pointer'>
          Добавить
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <h2 className='text-lg font-bold mb-4'>Add a New Plant Lot</h2>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-4'
        >
          <PlantSelect
            name='plant_id'
            errors={errors}
            control={control}
            register={register}
          />

          <div>
            <label>Date Planted</label>
            <Input
              type='date'
              {...register("date_planted")}
            />
            {errors.date_planted && (
              <p className='text-red-500'>{errors.date_planted.message}</p>
            )}
          </div>

          <div>
            <label>Type of Soil</label>
            <Input {...register("type_of_soil")} />
            {errors.type_of_soil && (
              <p className='text-red-500'>{errors.type_of_soil.message}</p>
            )}
          </div>

          <div>
            <label>Soil Number</label>
            <Input
              type='number'
              {...register("soil_number")}
            />
            {errors.soil_number && (
              <p className='text-red-500'>{errors.soil_number.message}</p>
            )}
          </div>

          <div>
            <label>Date Harvested</label>
            <Input
              type='date'
              {...register("date_harvested")}
            />
            {errors.date_harvested && (
              <p className='text-red-500'>{errors.date_harvested.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type='button'
              variant='ghost'
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type='submit'>Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
