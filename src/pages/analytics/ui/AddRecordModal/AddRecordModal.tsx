import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddRecordBySeedbedId } from "@/entities/Journal/hooks/useAddRecordBySeedbedId";
import {
  RecordsBaseForm,
  RecordsBaseFormSchema,
} from "@/entities/Journal/schemas/schemas";
import { toBase64 } from "@/shared/utils/toBase64/toBase64";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

export const AddRecordModal = () => {
  const { id } = useParams<{ id: string }>();
  const mutation = useAddRecordBySeedbedId(id ? +id : undefined);
  const { mutateAsync } = mutation || {};

  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RecordsBaseForm>({
    resolver: zodResolver(RecordsBaseFormSchema),
  });

  const onSubmit = async (data: RecordsBaseForm) => {
    const file = data.photo_link;
    if (!(file instanceof File)) {
      toast.error("Файл не выбран или файл является недопустимым");
      return;
    }

    try {
      const base64 = await toBase64(file);

      const payload = {
        ...data,
        photo_link: base64,
      };

      if (mutateAsync) {
        await mutateAsync(payload);
        reset();
        queryClient.refetchQueries({ queryKey: ["records"] });
        setOpen(false);
      } else {
        toast.error("Mutation function is not available");
      }
    } catch (err) {
      toast.error("Ошибка при загрузке файла:");
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
          <h2 className='text-lg font-bold mb-4'>
            Добавьте новую партию растений
          </h2>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-4'
        >
          <div>
            <label className='block text-sm font-medium'>
              Температура воды (°C)
            </label>
            <input
              type='number'
              step='any'
              {...register("water_temperature", { valueAsNumber: true })}
              className='w-full p-2 border border-gray-300 rounded-md'
            />
            {errors.water_temperature && (
              <p className='text-red-500 text-sm'>
                {errors.water_temperature.message}
              </p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium'>
              Температура воздуха (°C)
            </label>
            <input
              type='number'
              step='any'
              {...register("air_temperature", { valueAsNumber: true })}
              className='w-full p-2 border border-gray-300 rounded-md'
            />
            {errors.air_temperature && (
              <p className='text-red-500 text-sm'>
                {errors.air_temperature.message}
              </p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium'>
              Влажность воздуха (%)
            </label>
            <input
              type='number'
              step='any'
              {...register("air_humidity", { valueAsNumber: true })}
              className='w-full p-2 border border-gray-300 rounded-md'
            />
            {errors.air_humidity && (
              <p className='text-red-500 text-sm'>
                {errors.air_humidity.message}
              </p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium'>
              Уровень света (lux)
            </label>
            <input
              type='number'
              step='any'
              {...register("light_level", { valueAsNumber: true })}
              className='w-full p-2 border border-gray-300 rounded-md'
            />
            {errors.light_level && (
              <p className='text-red-500 text-sm'>
                {errors.light_level.message}
              </p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium'>
              Высота зелени (cm)
            </label>
            <input
              type='number'
              step='any'
              {...register("height_plant", { valueAsNumber: true })}
              className='w-full p-2 border border-gray-300 rounded-md'
            />
          </div>

          <input
            type='file'
            accept='image/*'
            {...register("photo_link")}
            className='w-full p-2 border border-gray-300 rounded-md'
          />

          <DialogFooter>
            <Button
              type='button'
              variant='ghost'
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type='submit'>Добавить</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
