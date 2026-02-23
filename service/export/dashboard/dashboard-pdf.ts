import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportDashboardToPDF = (
    stats: any, 
    paymentMap: Record<string, string>, 
    statusMap: Record<string, any>
) => {
    if (!stats) return;

    const doc = new jsPDF();
    const dateNow = new Date().toLocaleDateString('pt-BR');
    const currency = (v: number) => `R$ ${(v || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

    doc.setFontSize(18);
    doc.setTextColor(33, 33, 33);
    doc.text("Relatório Geral do Painel Administrativo", 14, 15);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Gerado em: ${dateNow}`, 14, 22);

    doc.setDrawColor(230, 230, 230);
    doc.line(14, 28, 196, 28);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Resumo de Desempenho", 14, 38);

    doc.setFontSize(10);
    doc.text(`Receita Total: ${currency(stats?.totalRevenue)}`, 14, 48);
    doc.text(`Total de Clientes: ${stats?.totalClients || 0}`, 14, 55);
    doc.text(`Pedidos Pendentes: ${stats?.pendingOrders || 0}`, 100, 48);
    doc.text(`Itens Produzidos: ${stats?.totalItemsProduced || 0}`, 100, 55);

    doc.setFontSize(12);
    doc.text("Histórico de Atividade Recente", 14, 75);

    const activities = stats?.listAllRecentyActivity || [];

    if (activities.length === 0) {
        doc.setFontSize(10);
        doc.setTextColor(150, 0, 0);
        doc.text("Nenhuma atividade recente registrada no sistema.", 14, 85);
    } else {
        const tableBody = activities.map((item: any) => [
            `#${item?.itemId || 'N/A'}`,
            item?.name || 'Cliente não identificado',
            paymentMap[item?.methodPayment] || item?.methodPayment || 'N/A',
            statusMap[item?.status]?.label || item?.status || 'N/A',
            item?.dateOrder 
                ? item.dateOrder.split("T")[0].split("-").reverse().join("/") 
                : "N/A"
        ]);

        autoTable(doc, {
            startY: 80,
            head: [['Pedido', 'Cliente', 'Pagamento', 'Status', 'Data']],
            body: tableBody,
            theme: 'striped',
            headStyles: { fillColor: [40, 40, 40], textColor: [255, 255, 255] },
            styles: { fontSize: 9 },
        });
    }

    doc.addPage(); 
    const finalY = 20;

    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("Fechamento do Período", 14, finalY);
    
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(14, finalY + 5, 196, finalY + 5);

    doc.setFontSize(11);
    const boxY = finalY + 15;
    doc.setFillColor(245, 245, 245);
    doc.rect(14, boxY, 182, 40, "F"); 
    
    doc.text("Métricas Consolidadas:", 20, boxY + 10);
    doc.setFontSize(10);
    doc.text(`- Volume de Vendas: ${currency(stats?.totalRevenue)}`, 25, boxY + 20);
    doc.text(`- Total de Pedidos na Lista: ${activities.length}`, 25, boxY + 28);
    doc.text(`- Status do Ateliê: OPERACIONAL`, 25, boxY + 36);

    doc.setFontSize(8);
    doc.setTextColor(130);
    const footerText = "Este relatório foi gerado automaticamente pelo sistema de gestão do Ateliê e contém dados sensíveis.";
    doc.text(footerText, 14, doc.internal.pageSize.getHeight() - 25);
    doc.text(`ID de Autenticação: ${Math.random().toString(36).substring(2, 15).toUpperCase()}`, 14, doc.internal.pageSize.getHeight() - 20);

    const totalPages = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(
            `Página ${i} de ${totalPages}`,
            doc.internal.pageSize.getWidth() - 30,
            doc.internal.pageSize.getHeight() - 10
        );
    }

    doc.save(`relatorio_dashboard_atelie_${Date.now()}.pdf`);
};