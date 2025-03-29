import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useCreatePlantByImage } from "@/entities/Plant/hooks/useCreatePlantByImage";
import { CameraCapture } from "../CameraCapture/CameraCapture";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

export const AddPlanByImage = () => {
  const { mutate } = useCreatePlantByImage();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleCameraCapture = async (imageData: string) => {
    onSubmit(imageData);
  };

  const onSubmit = (data: string) => {
    mutate(data, {
      onSuccess: () => {
        queryClient.refetchQueries({
          queryKey: ["useGetPlants"],
        });
        setOpen(false);
      },
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      key={"addplantbyimage"}
    >
      <DialogTrigger asChild>
        <Button
          className='w-[200px] p-4 rounded-md border-2 border-gray-300 cursor-pointer transition-all duration-300 ease-in-out
              hover:bg-blue-600 hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              active:bg-blue-700 active:scale-95'
        >
          Добавить через фото
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[90%] max-h-[90vh] overflow-hidden'>
        <DialogHeader>
          <h2>Добавить микрозелень через фото</h2>
        </DialogHeader>
        <div className='relative w-full h-[75vh] overflow-hidden'>
          <CameraCapture onCapture={handleCameraCapture} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
