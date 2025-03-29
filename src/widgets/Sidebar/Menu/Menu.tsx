import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import { sidebarItems } from "../routes";

export const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  return sidebarItems.map((group) => (
    <div key={group.key}>
      <h3 className='text-[#6C6C6C] text-xs mb-4'>{group.label}</h3>
      <ul className='space-y-4 pl-[10px] pt-[10px]'>
        {group.children.map((item) => (
          <li
            key={item.key}
            className={clsx(
              "flex items-center gap-2 rounded-lg cursor-pointer p-2 transition-all duration-300",
              "hover:bg-[#262626] hover:text-white",
              pathname === item.key
                ? "bg-[#262626] text-white"
                : "bg-transparent",
            )}
            onClick={() => navigate(item.key)}
          >
            {item.icon}
            <span className='text-sm'>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  ));
};
