export function ProductsPage() {
    return (
        <div className="max-w-350 mx-auto space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Produtos</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="aspect-3/4 bg-muted/30 rounded-xl border animate-pulse" />
                ))}
            </div>
        </div>
    );
}