import { AddPlantModal } from "./AddPlantModal/AddPlantModal";
import { PlantsTable } from "./PlantsTable";
import { Input } from "@/components/ui/input";

export const PlantsPage = () => {
  return (
    <section className='w-full flex flex-col gap-4'>
      <div className='flex gap-4'>
        <Input
          type='text'
          placeholder='Поиск'
          className='flex-1 p-4 rounded-2xl  border-2 border-gray-300'
        />
        <AddPlantModal />
      </div>
      <PlantsTable />
    </section>
  );
};
