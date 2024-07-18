
import { useState } from "react";
import React from "react";
import { MenuIcon, X } from "lucide-react";
import { cn } from "../lib/utils";
import Popover from "./ui/Popover";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../App";


const Menu = () => {
    const [open, setOpen] = useState(false);

    return (
        <Popover setOpen={setOpen}>
            <Popover.Trigger setOpen={setOpen}>
                <div className={cn("rounded hover:bg-accent text-white hover:text-primary size-10 flex items-center justify-center cursor-pointer", open && 'bg-white border text-primary')}>
                    {open ? <X size={30} /> : <MenuIcon size={30} />}
                </div>
            </Popover.Trigger>
            <Popover.Content open={open} activateBlur={false} top="3rem">

                <ul className="w-60 rounded border bg-white p-1">
                    <Link to={`${BASE_URL}`} onClick={() => setOpen(false)}>
                        <li className="rounded hover:bg-accent transition-all cursor-pointer px-4 py-2">
                            Главная
                        </li>
                    </Link>
                    <Link to={`${BASE_URL}/employees`} onClick={() => setOpen(false)}>
                        <li className="rounded hover:bg-accent transition-all cursor-pointer px-4 py-2">
                            Поиск Сотрудников
                        </li>
                    </Link>
                    <Link to={`${BASE_URL}/settings`} onClick={() => setOpen(false)}>
                        <li className="rounded hover:bg-accent transition-all cursor-pointer px-4 py-2">
                            Настройки
                        </li>
                    </Link>
                </ul>

            </Popover.Content>
        </Popover>
    );
}

export default Menu