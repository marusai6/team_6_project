import React, { useState } from "react"
import { Button } from "./Button"
import { useOutsideClick } from "../hooks/useOutsideClick";

export const Popover = ({ children, open, setOpen }: { children: React.ReactNode, open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {


    const ref = useOutsideClick(() => {
        setOpen(false)
    });

    return (
        <div ref={ref} className="relative">
            <Button variant="outline" onClick={() => setOpen(true)}>Выбрать страну</Button>
            {open &&
                <div className="absolute border rounded p-1 bg-popover text-popover-foreground top-10 left-0 z-50">
                    {children}
                </div>
            }
        </div>
    )
}