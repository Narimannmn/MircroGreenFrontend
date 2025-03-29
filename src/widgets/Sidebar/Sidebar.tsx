import { IconContext } from "react-icons";
import { Menu } from "./Menu/Menu";

export const Sidebar = () => {
  return (
    <aside
      className={
        "h-full bg-[#FFFFFF] shadow-2xl rounded-3xl transition-all w-[232px] space-y-8 p-4"
      }
    >
      <h1 className='text-[#172D43] text-[32px] font-bold'>MicroTravka</h1>
      <IconContext.Provider value={{ size: "20" }}>
        <Menu />
      </IconContext.Provider>
    </aside>
  );
};
