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
import { ItemMin } from "@/types/type"

export function ComboboxItem({ selectedIds = [], onChange }: { selectedIds: string[], onChange?: (values: string[]) => void}) {
    const [open, setOpen] = React.useState(false)
    const [items, setItems] = React.useState<ItemMin[]>([])
    const [loading, setLoading] = React.useState(true)
    const { listAllItemsByCode } = ListAllItemMin()

    React.useEffect(() => {
        async function fetchItems() {
            setLoading(true)
            try {
                const data = await listAllItemsByCode(selectedIds)
                const transformedData = Array.isArray(data) ? data.map(item => ({
                    ...item,
                    id: typeof item.id === 'string' ? parseInt(item.id, 10) : item.id
                })) : []
                setItems(transformedData)
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

    const truncateCode = (code: string) => {
        return code.length > 10 ? `${code.substring(0, 10)}...` : code;
    }

    return (
        <div className="flex flex-col gap-2">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger render={
                    <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between text-left"
                        disabled={loading}
                    >
                        <div className="flex flex-wrap gap-1 items-center overflow-hidden">
                            {selectedIds.length > 0 ? (
                                selectedIds.map((id) => {
                                    const item = items.find((i) => String(i.id).trim() === String(id).trim())
                                    const displayLabel = item ? truncateCode(item.itemCode) : `ID: ${id}`

                                    return (
                                        <Badge
                                            key={id}
                                            variant="secondary"
                                            className="flex items-center gap-1 max-w-37.5 truncate"
                                        >
                                            <span className="truncate">{displayLabel}</span>
                                            <X
                                                className="h-3 w-3 shrink-0 cursor-pointer hover:text-destructive"
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
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
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
                                                className="flex items-center justify-between py-2" 
                                            >
                                                <div className="flex items-center min-w-0 flex-1 mr-2">
                                                    <div className={cn(
                                                        "mr-2 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-primary",
                                                        isSelected ? "bg-primary text-primary-foreground" : "opacity-50"
                                                    )}>
                                                        {isSelected && <Check className="h-3 w-3" />}
                                                    </div>
                                                    <Package className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                                                    <span className="truncate font-semibold text-sm">
                                                        {item.itemCode}
                                                    </span>
                                                </div>
                                                <Badge
                                                    variant="secondary"
                                                    className="ml-auto shrink-0 bg-secondary/50 text-[10px] px-1.5 h-5 min-w-8 justify-center"
                                                >
                                                    x{item.quantity}
                                                </Badge>
                                            </CommandItem>
                                        )
                                    })}
                                </CommandGroup>
                            </ScrollArea>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}