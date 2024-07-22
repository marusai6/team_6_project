import React from 'react'
import { ScrollArea } from './scroll-area'
import { Check } from 'lucide-react'
import { cn } from '../../lib/utils'

const Select = ({ options, onClick, active }: { options: string[], onClick: (value: string) => void, active: string }) => {

    return (
        <div className='divide-y flex flex-col max-h-80 select-none'>
            <ScrollArea className='flex flex-col p-1 gap-1 flex-1'>
                {options.length == 0 && <div className='p-1 px-3 text-center text-accent-foreground'>Нет результатов</div>}
                {options.map((option) => {
                    return (
                        <div key={`option-${options}`} className={cn('flex gap-1 items-center p-1 px-3 pr-6 bg-white cursor-pointer hover:bg-accent rounded transition-all', option == active && 'bg-accent')} onClick={() => onClick(option)}>
                            <div className='size-6 shrink-0'>
                                {option == active && <Check strokeWidth={1.5} className='w-full text-primary' />}
                            </div>
                            {option}
                        </div>
                    )
                })}
            </ScrollArea>
        </div>
    )
}

export default Select