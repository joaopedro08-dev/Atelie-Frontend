import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportClientsToPDF = (clients: any[]) => {
    if (!clients || clients.length === 0) return;

    const doc = new jsPDF();
    const dateNow = new Date().toLocaleDateString('pt-BR');

    doc.setFontSize(18);
    doc.text("Relatório de Clientes - Ateliê - Encantos do Arcanjo", 14, 15);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Gerado em: ${dateNow}`, 14, 22);
    doc.line(14, 25, 196, 25);

    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text("Resumo da Base", 14, 35);
    doc.setFontSize(10);
    doc.text(`Total de Clientes Cadastrados: ${clients.length}`, 14, 45);

    const tableBody = clients.map((c, i) => [
        `Cliente ${i + 1}`,
        c.name || 'N/A',
        c.email || 'N/A',
        c.phone || 'N/A',
        new Date(c.createdAt).toLocaleDateString('pt-BR')
    ]);

    autoTable(doc, {
        startY: 55,
        head: [['Nº', 'Nome', 'E-mail', 'Telefone', 'Cadastro']],
        body: tableBody,
        theme: 'striped',
        headStyles: { fillColor: [40, 40, 40] },
        styles: { fontSize: 8 }
    });

    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFontSize(8);
    doc.text(`Autenticação: ${Math.random().toString(36).substring(2, 12).toUpperCase()}`, 14, pageHeight - 10);

    doc.save(`relatorio_client_atelie_${Date.now()}.pdf`);
};