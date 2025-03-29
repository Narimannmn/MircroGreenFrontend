import { IconContext } from "react-icons";
import { Menu } from "./Menu/Menu";

export const Sidebar = () => {
  return (
    <aside
      className={
        "h-full bg-[#FFFFFF] border-r border-gray-300 transition-all w-[232px] space-y-8 p-4 hidden md:block"
      }
    >
      <h1 className='text-[#172D43] text-[32px] font-bold'>
        Micro<span className='text-green-900'>Travka</span>
      </h1>
      <IconContext.Provider value={{ size: "20" }}>
        <Menu />
      </IconContext.Provider>
    </aside>
  );
};
