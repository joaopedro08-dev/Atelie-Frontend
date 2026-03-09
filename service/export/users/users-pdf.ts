import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportUsersToPDF = (users: any[]) => {
    if (!users || users.length === 0) return;

    const doc = new jsPDF();
    const dateNow = new Date().toLocaleString('pt-BR');

    doc.setFontSize(18);
    doc.text("Relatório de Usuários - Ateliê - Encantos do Arcanjo", 14, 15);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Gerado em: ${dateNow}`, 14, 22);
    doc.line(14, 25, 196, 25);

    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text("Resumo da Base", 14, 35);
    doc.setFontSize(10);
    doc.text(`Total de usuários da plataforma cadastrados: ${users.length}`, 14, 45);

    const tableBody = users.map((u) => [
        `#${String(u.id).padStart(3, '0')}`,
        u.name || 'N/A',
        u.email || 'N/A',
        u.role ? "Usuário" : 'N/A',
        u.statusSystem ? 'Ativo' : 'Inativo',
        new Date(u.createdAt).toLocaleDateString('pt-BR')
    ]);

    autoTable(doc, {
        startY: 55,
        head: [['ID', 'Nome', 'E-mail', 'Role', 'Status', 'Cadastro']],
        body: tableBody,
        theme: 'striped',
        headStyles: { fillColor: [40, 40, 40] },
        styles: { fontSize: 8 }
    });

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

    doc.save(`relatorio_users_atelie_${Date.now()}.pdf`);
};