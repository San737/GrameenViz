import Map from "../_components/map/map";

export default function mapPage() {
  return (
    <div className="bg-slate-50">
      <header className="fixed left-0 right-0 top-0 z-50 h-12 bg-slate-500 p-3">
        tab
      </header>
      <main className="mt-12 h-[1000px] bg-red-400">
        <div>
          hi
          <Map />
        </div>
      </main>
      <footer className="bg-slate-500">footer</footer>
    </div>
  );
}
