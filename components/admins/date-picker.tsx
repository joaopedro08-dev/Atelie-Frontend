"use client"

import * as React from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale" 
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
    date: Date | undefined
    setDate: (date: Date | undefined) => void
}

export function DatePicker({ date, setDate }: DatePickerProps) {
    const [open, setOpen] = React.useState(false)
    const currentYear = new Date().getFullYear();

    const handleSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate)
        setOpen(false) 
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger render={
                <Button
                    variant="outline"
                    className={cn(
                        "w-full justify-start text-left font-normal bg-background border-border/50 px-3 hover:bg-background active:scale-[0.99] transition-all",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4 text-primary opacity-70" />
                    <span className="truncate">
                        {date ? (
                            format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                        ) : (
                            "Selecione a data"
                        )}
                    </span>
                </Button>
            } />
            <PopoverContent 
                className="w-auto p-0 border-none shadow-2xl z-50 rounded-3xl" 
                align="start"
                sideOffset={8}
            >
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleSelect} 
                    locale={ptBR}                    
                    captionLayout="dropdown"
                    fromYear={currentYear} 
                    toYear={2034} 
                    initialFocus
                    className="rounded-3xl bg-card border border-border p-3"
                    classNames={{
                        caption_label: "hidden", 
                        caption_dropdowns: "flex justify-center gap-1 items-center font-medium",
                        dropdown: "rdp-dropdown bg-background text-foreground focus:outline-none capitalize appearance-none cursor-pointer py-1 px-2 rounded-md transition-colors font-bold text-sm",
                        dropdown_month: "capitalize",
                        dropdown_year: "font-mono", 
                        nav_button_previous: "absolute left-4 top-4", 
                        nav_button_next: "absolute right-4 top-4",
                        caption: "relative flex items-center justify-center pt-1 pb-4",
                        table: "w-full border-collapse space-y-1",
                        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                        cell: "text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
                        day: cn(
                          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent rounded-md transition-all"
                        ),
                        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                    }}
                />
            </PopoverContent>
        </Popover>
    )
}