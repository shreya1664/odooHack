function PlaceholderPage({ title }) {
  return (
    <div>
      <h2 className="text-3xl font-bold">{title}</h2>

      <p className="mt-2 text-slate-400">
        This section will be implemented next.
      </p>

      <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-8">
        <p className="text-slate-500">
          StockSense {title} module
        </p>
      </div>
    </div>
  );
}

export default PlaceholderPage;