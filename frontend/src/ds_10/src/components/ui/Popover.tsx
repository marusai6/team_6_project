import React, { useEffect } from "react"
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { cn } from "../../lib/utils";
import { useDispatch } from "react-redux";
import { changeBlurEffect } from "../../state/blurEffect/blurEffectSlice";
import { AnimatePresence, motion } from "framer-motion";

const Popover = ({ children, setOpen }: { children: React.ReactNode, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const ref = useOutsideClick(() => {
        setOpen(false)
    });

    return (
        <div ref={ref} className="relative w-fit">
            {children}
        </div>
    )
}

Popover.Trigger = ({ children, setOpen }: { children: React.ReactNode, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return <div className="h-full" onClick={() => setOpen((prev) => !prev)}>{children}</div>
}

Popover.Content = ({ children, open, align = 'right', activateBlur = true, top = '3.75rem' }: { children: React.ReactNode, open: boolean, align?: 'right' | 'left' | 'center', activateBlur?: boolean, top?: string }) => {

    const dispatch = useDispatch()
    useEffect(() => {
        if (activateBlur) {
            dispatch(changeBlurEffect(open))
        }
    }, [open])

    const centerVariant = align == 'center' ? { left: '50%', x: '-50%' } : {}

    return (
        <AnimatePresence initial={false}>
            <motion.div
                variants={{
                    open: { opacity: 1, scale: 1 },
                    closed: { opacity: 0, scale: 0 },
                }}
                style={{ top, ...centerVariant, originY: 0 }}
                initial={"closed"}
                animate={open ? "open" : "closed"}
                exit={"closed"}
                className={cn("absolute border rounded bg-popover text-popover-foreground z-50 top-[3.75rem]",
                    align == 'right' && 'right-0',
                    align == 'left' && 'left-0',
                )}
                transition={{ duration: 0.3 }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}

export default Popover;