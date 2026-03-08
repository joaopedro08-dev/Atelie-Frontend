"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ListAllClientsMin } from "@/service/combobox/client"

export function ComboboxClient({ value, onChange }: { value: string | undefined; onChange?: (value: string) => void }) {
    const [open, setOpen] = React.useState(false);
    const [clients, setClients] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const { listClientsMin } = ListAllClientsMin();

    React.useEffect(() => {
        async function fetchClients() {
            setLoading(true)
            try {
                const data = await listClientsMin()
                setClients(Array.isArray(data) ? data : [])
            } finally {
                setLoading(false)
            }
        }
        fetchClients()
    }, [])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger render={
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                    disabled={loading}
                >
                    <span className="truncate">
                        {loading ? "Carregando..." : (value 
                            ? clients.find((c) => c.id.toString() === value)?.name 
                            : "Selecione um cliente...")}
                    </span>
                    <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                </Button>
            } />
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                <Command>
                    <CommandInput placeholder="Buscar cliente..." />
                    <CommandList>
                        <CommandEmpty>Nenhum cliente.</CommandEmpty>
                        <ScrollArea className="max-h-48">
                            <CommandGroup>
                                {clients.map((client) => (
                                    <CommandItem
                                        key={client.id}
                                        value={client.name}
                                        onSelect={() => {
                                            const newValue = client.id.toString()
                                            onChange?.(newValue === value ? "" : newValue)
                                            setOpen(false)
                                        }}
                                    >
                                        <Check className={cn("mr-2 h-4 w-4", value === client.id.toString() ? "opacity-100" : "opacity-0")} />
                                        {client.name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </ScrollArea>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}