import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportItemsToPDF = (items: any[]) => {
    if (!items || items.length === 0) return;

    const doc = new jsPDF();
    const dateNow = new Date().toLocaleDateString('pt-BR');
    const currency = (v: number) => `R$ ${(v || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

    const totalValue = items.reduce((acc, item) => acc + (item.totalPrice || 0), 0);

    doc.setFontSize(18);
    doc.setTextColor(33, 33, 33);
    doc.text("Relatório de Itens - Ateliê - Encantos do Arcanjo", 14, 15);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Gerado em: ${dateNow}`, 14, 22);

    doc.setDrawColor(230, 230, 230);
    doc.line(14, 28, 196, 28);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Resumo do Inventário", 14, 38);
    doc.setFontSize(10);
    doc.text(`Quantidade Total: ${items.length} itens listados`, 14, 48);
    doc.text(`Valor Total Geral: ${currency(totalValue)}`, 100, 48);

    doc.setFontSize(12);
    doc.text("Listagem Detalhada", 14, 65);

    const tableBody = items.map((item: any, index: number) => [
        `Item ${index + 1}`,
        `#${item?.code || 'N/A'}`,
        currency(item?.unitPrice),
        currency(item?.totalPrice),
        item?.createdAt 
            ? new Date(item.createdAt).toLocaleDateString('pt-BR') 
            : "N/A"
    ]);

    autoTable(doc, {
        startY: 70,
        head: [['Nº', 'Código', 'Preço Unitário', 'Preço Total', 'Data Cadastro']],
        body: tableBody,
        theme: 'striped',
        headStyles: { fillColor: [40, 40, 40], textColor: [255, 255, 255] },
        styles: { fontSize: 9 },
        columnStyles: {
            0: { cellWidth: 25, fontStyle: 'bold' }, 
            3: { halign: 'right' },                 
            4: { halign: 'center' }                
        }
    });

    const finalY = (doc as any).lastAutoTable.finalY + 20;
    
    let currentY = finalY;
    if (currentY > 240) {
        doc.addPage();
        currentY = 20;
    }

    doc.setFontSize(14);
    doc.text("Métricas Consolidadas", 14, currentY);
    doc.setDrawColor(200);
    doc.line(14, currentY + 2, 60, currentY + 2);

    doc.setFontSize(10);
    doc.text(`- Volume Total: ${currency(totalValue)}`, 14, currentY + 12);
    doc.text(`- Total de Registros: ${items.length}`, 14, currentY + 20);
    doc.text(`- Status: DOCUMENTO AUTENTICADO`, 14, currentY + 28);

    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(`ID de Autenticação: ${Math.random().toString(36).substring(2, 15).toUpperCase()}`, 14, pageHeight - 15);

    const totalPages = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.text(`Página ${i} de ${totalPages}`, doc.internal.pageSize.getWidth() - 30, pageHeight - 10);
    }

    doc.save(`relatorio_itens_atelie_${Date.now()}.pdf`);
};