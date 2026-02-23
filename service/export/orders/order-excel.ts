import * as XLSX from "xlsx";

export const exportOrdersToExcel = (
    orders: any[],
    statusMap: Record<string, any>,
    paymentMap: Record<string, string>
) => {
    if (!orders || orders.length === 0) return;
    
    const cleanItemIds = (itemIds: any) => {
        if (!itemIds) return "N/A";
        const combined = Array.isArray(itemIds)
            ? itemIds.join(", ")
            : String(itemIds);
        return combined.replace(/[\[\]]/g, "");
    };

    const summaryHeader = [
        ["HISTÓRICO DE VENDAS E PEDIDOS - ATELIÊ - ENCANTOS DO ARCANJO"],
        [`Relatório extraído em: ${new Date().toLocaleString('pt-BR')}`],
        [],
        ["Nº Contagem", "ID Cliente", "IDs dos Itens", "Método Pagamento", "Status Atual", "Data do Pedido"]
    ];

    const rows = orders.map((order, i) => [
        `Pedido ${i + 1}`,
        order.clientId,
        cleanItemIds(order.itemIds || order.itemId), 
        paymentMap[order.methodPayment] || order.methodPayment,
        statusMap[order.status]?.label || order.status,
        order.dateOrder ? new Date(order.dateOrder).toLocaleDateString('pt-BR') : "N/A"
    ]);

    const ws = XLSX.utils.aoa_to_sheet([...summaryHeader, ...rows]);

    ws['!cols'] = [
        { wch: 15 }, 
        { wch: 12 },
        { wch: 35 }, 
        { wch: 20 }, 
        { wch: 20 }, 
        { wch: 15 }  
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Pedidos");

    XLSX.writeFile(wb, `relatorio_order_atelie_${Date.now()}.xlsx`);
};