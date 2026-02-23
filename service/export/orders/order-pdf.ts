import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportOrdersToPDF = (
    orders: any[], 
    statusMap: Record<string, any>, 
    paymentMap: Record<string, string>
) => {
    if (!orders || orders.length === 0) return;

    const doc = new jsPDF();
    const dateNow = new Date().toLocaleDateString('pt-BR');

    const cleanItemIds = (itemIds: any) => {
        if (!itemIds) return "N/A";
        
        const combined = Array.isArray(itemIds) 
            ? itemIds.join(", ") 
            : String(itemIds);

        return combined.replace(/[\[\]]/g, ""); 
    };

    doc.setFontSize(18);
    doc.setTextColor(33, 33, 33);
    doc.text("Relatório de Pedidos - Ateliê Store", 14, 15);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Gerado em: ${dateNow} | Total: ${orders.length} pedidos`, 14, 22);
    doc.line(14, 25, 196, 25);

    const tableBody = orders.map((order, i) => [
        `Pedido ${i + 1}`,
        cleanItemIds(order.itemIds), 
        order.clientId || 'N/A',
        paymentMap[order.methodPayment] || order.methodPayment,
        statusMap[order.status]?.label || order.status,
        order.dateOrder ? new Date(order.dateOrder).toLocaleDateString('pt-BR') : "N/A"
    ]);

    autoTable(doc, {
        startY: 35,
        head: [['Nº Contagem', 'IDs dos Itens', 'ID Cliente', 'Pagamento', 'Status', 'Data']],
        body: tableBody,
        theme: 'striped',
        headStyles: { fillColor: [40, 40, 40] },
        styles: { fontSize: 8 },
        columnStyles: { 
            1: { cellWidth: 45 }, 
            4: { fontStyle: 'bold' } 
        }
    });

    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFontSize(8);
    const authCode = Math.random().toString(36).substring(2, 12).toUpperCase();
    doc.text(`Autenticação: ${authCode} | Sistema de Gestão Ateliê`, 14, pageHeight - 10);

    doc.save(`relatorio_order_atelie_${Date.now()}.pdf`);
};