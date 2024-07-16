import React, { useEffect } from "react"
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { cn } from "../../lib/utils";
import { useDispatch } from "react-redux";
import { changeBlurEffect } from "../../state/blurEffect/blurEffectSlice";

const Popover = ({ children, setOpen }: { children: React.ReactNode, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const ref = useOutsideClick(() => {
        setOpen(false)
    });

    return (
        <div ref={ref} className="relative">
            {children}
        </div>
    )
}

Popover.Trigger = ({ children, setOpen }: { children: React.ReactNode, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return <div onClick={() => setOpen((prev) => !prev)}>{children}</div>
}

Popover.Content = ({ children, open, align = 'right' }: { children: React.ReactNode, open: boolean, align?: 'right' | 'left' | 'center' }) => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(changeBlurEffect(open))
    }, [open])

    return (
        <>
            {open &&
                <div className={cn("absolute border rounded bg-popover text-popover-foreground z-50 top-[3.75rem]",
                    align == 'center' && 'left-1/2 transform -translate-x-1/2',
                    align == 'right' && 'right-0',
                    align == 'left' && 'left-0',
                )}>
                    {children}
                </div>
            }
        </>
    )
}

export default Popover;