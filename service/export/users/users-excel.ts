import * as XLSX from "xlsx";

export const exportUsersToExcel = (users: any[]) => {
    const summaryHeader = [
        ["LISTAGEM DE USUÁRIOS - ATELIÊ - ENCANTOS DO ARCANJO"],
        [`Exportado em: ${new Date().toLocaleString('pt-BR')}`],
        [],
        ["ID", "Nome Completo", "E-mail", "Role", "Status do Sistema", "Data de Cadastro"]
    ];

    const rows = users.map((u) => [
        `#${String(u.id).padStart(3, '0')}`,
        u.name || 'N/A',
        u.email || 'N/A',
        u.role ? "Usuário" : 'N/A',
        u.statusSystem ? 'Ativo' : 'Inativo',
        new Date(u.createdAt).toLocaleDateString('pt-BR')
    ]);

    const ws = XLSX.utils.aoa_to_sheet([...summaryHeader, ...rows]);
    ws['!cols'] = [{ wch: 10 }, { wch: 30 }, { wch: 30 }, { wch: 15 }, { wch: 20 }, { wch: 20 }];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Usuários");
    XLSX.writeFile(wb, `relatorio_users_atelie_${Date.now()}.xlsx`);
};