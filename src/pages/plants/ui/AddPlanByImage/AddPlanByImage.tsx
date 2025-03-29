import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useCreatePlantByImage } from "@/entities/Plant/hooks/useCreatePlantByImage";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CameraCapture } from "../CameraCapture/CameraCapture";

export const AddPlanByImage = () => {
  const { mutate } = useCreatePlantByImage();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleCameraCapture = (imageData: string) => {
    // Call the mutation with the captured image data
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
        <Button className='w-[200px] p-4 rounded-md border-2 border-gray-300 cursor-pointer'>
          Добавить через фото
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[90%] max-h-[90vh] overflow-hidden'>
        <DialogHeader>
          <h2>Add a New Plant by Photo</h2>
        </DialogHeader>
        <div className='relative w-full h-[75vh] overflow-hidden'>
          <CameraCapture onCapture={handleCameraCapture} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
