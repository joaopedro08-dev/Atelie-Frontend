import * as XLSX from "xlsx";

export const exportClientsToExcel = (clients: any[]) => {
    const summaryHeader = [
        ["LISTAGEM DE CLIENTES - ATELIÊ - ENCANTOS DO ARCANJO"],
        [`Exportado em: ${new Date().toLocaleString('pt-BR')}`],
        [],
        ["Nº", "Nome Completo", "E-mail", "Telefone", "Data de Cadastro"]
    ];

    const rows = clients.map((c, i) => [
        `Cliente ${i + 1}`,
        c.name,
        c.email,
        c.phone,
        new Date(c.createdAt).toLocaleDateString('pt-BR')
    ]);

    const ws = XLSX.utils.aoa_to_sheet([...summaryHeader, ...rows]);
    ws['!cols'] = [{ wch: 12 }, { wch: 35 }, { wch: 30 }, { wch: 20 }, { wch: 15 }];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Clientes");
    XLSX.writeFile(wb, `relatorio_client_atelie_${Date.now()}.xlsx`);
};