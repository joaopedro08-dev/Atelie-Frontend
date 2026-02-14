"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Package, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ListAllItemMin } from "@/service/combobox/item"
import { Badge } from "@/components/ui/badge"

interface ItemMin {
    id: number;
    itemCode: string;
    quantity: number;
}

interface ComboboxItemProps {
    selectedIds?: string[];
    onChange?: (values: string[]) => void;
}

export function ComboboxItem({ selectedIds = [], onChange }: ComboboxItemProps) {
    const [open, setOpen] = React.useState(false)
    const [items, setItems] = React.useState<ItemMin[]>([])
    const [loading, setLoading] = React.useState(true)
    const { listAllItemsByCode } = ListAllItemMin()

    React.useEffect(() => {
        async function fetchItems() {
            setLoading(true)
            try {
                const data = await listAllItemsByCode(selectedIds)
                setItems(Array.isArray(data) ? data : [])
            } finally {
                setLoading(false)
            }
        }
        fetchItems()
    }, [selectedIds.length]); 

    const handleSelect = (id: string) => {
        const newSelection = selectedIds.includes(id)
            ? selectedIds.filter((item) => item !== id)
            : [...selectedIds, id]
        onChange?.(newSelection)
    }

    const removeSelection = (id: string, e: React.MouseEvent) => {
        e.stopPropagation()
        onChange?.(selectedIds.filter((item) => item !== id))
    }

    return (
        <div className="flex flex-col gap-2">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger render={
                    <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between h-auto text-left"
                        disabled={loading}
                    >
                        <div className="flex flex-wrap gap-1 py-1">
                            {selectedIds.length > 0 ? (
                                selectedIds.map((id) => {
                                    const item = items.find((i) => String(i.id).trim() === String(id).trim())

                                    return (
                                        <Badge key={id} variant="secondary" className="flex items-center gap-1">
                                            {item ? item.itemCode : `ID: ${id}`}
                                            <X
                                                className="h-3 w-3 cursor-pointer hover:text-destructive"
                                                onClick={(e) => removeSelection(id, e)}
                                            />
                                        </Badge>
                                    )
                                })
                            ) : (
                                <span>Selecione os itens...</span>
                            )}
                        </div>
                        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50 ml-2" />
                    </Button>
                } />
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                    <Command>
                        <CommandInput placeholder="Buscar código..." />
                        <CommandList>
                            <CommandEmpty>Nenhum item encontrado.</CommandEmpty>
                            <ScrollArea className="max-h-64">
                                <CommandGroup>
                                    {items.map((item) => {
                                        const itemId = item.id.toString()
                                        const isSelected = selectedIds.includes(itemId)
                                        return (
                                            <CommandItem
                                                key={item.id}
                                                value={item.itemCode}
                                                onSelect={() => handleSelect(itemId)}
                                                className="flex justify-between"
                                            >
                                                <div className="flex items-center">
                                                    <div className={cn(
                                                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                        isSelected ? "bg-primary text-primary-foreground" : "opacity-50"
                                                    )}>
                                                        {isSelected && <Check className="h-3 w-3" />}
                                                    </div>
                                                    <Package className="mr-2 h-4 w-4 opacity-50" />
                                                    {item.itemCode}
                                                </div>
                                                <Badge variant="outline">x{item.quantity}</Badge>
                                            </CommandItem>
                                        )
                                    })}
                                </CommandGroup>
                            </ScrollArea>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div >
    )
}