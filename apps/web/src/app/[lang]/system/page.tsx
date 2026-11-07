export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight">Bem-vindo ao Painel</h1>
      <p className="text-muted-foreground text-sm">
        Aqui podes gerir os teus produtos, comissões e estatísticas de afiliado.
      </p>

      {/* Exemplo de secção de conteúdo */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="font-semibold text-sm text-muted-foreground">
            Vendas Totais
          </h3>
          <p className="text-2xl font-bold mt-2">0 Kz</p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="font-semibold text-sm text-muted-foreground">
            Comissões Pendentes
          </h3>
          <p className="text-2xl font-bold mt-2">0 Kz</p>
        </div>
      </div>
    </div>
  );
}
