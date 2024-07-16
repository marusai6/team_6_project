"use client"

import * as React from "react"
import { CheckIcon } from "@radix-ui/react-icons"

import { cn } from "../../lib/utils"


export const Checkbox = ({ checked }: { checked: boolean }) => {

    const checkedStyles = cn('bg-black')

    return (
        <div className={cn("w-4 h-4 shrink-0 border rounded-sm", checked ? checkedStyles : null)}>
            {checked && <CheckIcon color="white" />}
        </div>
    )
}
