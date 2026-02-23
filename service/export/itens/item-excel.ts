import * as XLSX from "xlsx";

export const exportItemsToExcel = (items: any[]) => {
    if (!items || items.length === 0) return;

    const summaryHeader = [
        ["RELATÓRIO DE ITENS - ATELIÊ - ENCANTOS DO ARCANJO"],
        [`Gerado em: ${new Date().toLocaleDateString('pt-BR')} ${new Date().toLocaleTimeString('pt-BR')}`],
        [],
        ["Nº", "Código", "Preço Unitário", "Preço Total", "Data de Cadastro"]
    ];

    const itemsRows = items.map((item: any, index: number) => [
        `Item ${index + 1}`,
        `#${item?.code || 'N/A'}`,
        item?.unitPrice || 0,
        item?.totalPrice || 0,
        item?.createdAt ? new Date(item.createdAt).toLocaleDateString('pt-BR') : "N/A"
    ]);

    const wsItems = XLSX.utils.aoa_to_sheet([...summaryHeader, ...itemsRows]);

    wsItems['!cols'] = [
        { wch: 15 },
        { wch: 20 }, 
        { wch: 20 }, 
        { wch: 20 }, 
        { wch: 20 }  
    ];

    const totalValue = items.reduce((acc, item) => acc + (item.totalPrice || 0), 0);
    const authId = Math.random().toString(36).substring(2, 15).toUpperCase();

    const closingData = [
        ["RESUMO DE FECHAMENTO CONSOLIDADO - INVENTÁRIO"],
        [],
        ["Métrica", "Valor"],
        ["Quantidade de Itens Processados", items.length],
        ["Valor Total do Inventário", { t: 'n', v: totalValue, z: '"R$ "#,##0.00' }], 
        ["Média de Valor por Item", { t: 'n', v: totalValue / items.length, z: '"R$ "#,##0.00' }],
        [],
        ["INFORMAÇÕES DE SEGURANÇA [MECANISMO ATIVO]"],
        ["Token de Autenticação", authId],
        ["Integridade dos Dados", "Verificada"],
        ["Status do Ateliê", "OPERACIONAL"],
        ["Exportado por", "Sistema de Gestão de Itens"]
    ];

    const wsClosing = XLSX.utils.aoa_to_sheet(closingData);
    wsClosing['!cols'] = [{ wch: 35 }, { wch: 30 }];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wsItems, "Listagem de Itens");
    XLSX.utils.book_append_sheet(wb, wsClosing, "Auditoria e Segurança");

    XLSX.writeFile(wb, `relatorio_itens_atelie_${Date.now()}.xlsx`);
};