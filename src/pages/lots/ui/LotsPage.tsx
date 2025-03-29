import { AddLotModal } from "./AddLotModal/AddLotModal";
import { LotsTable } from "./LotsTable/LotsTable";
import { Input } from "@/components/ui/input";

export const LotsPage = () => {
  return (
    <section className='w-full flex flex-col gap-4'>
      <div className='flex gap-4'>
        <Input
          type='text'
          placeholder='Поиск'
          className='flex-1 p-4 rounded-md  border-2 border-gray-300'
        />
        <AddLotModal />
      </div>
      <LotsTable />
    </section>
  );
};
