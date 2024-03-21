import Image from "next/image";
import Map from "../_components/choropleth_map/map";
import Link from "next/link";

export default function mapPage() {
  return (
    <div className="bg-slate-50">
      <header className="absolute inset-x-0 top-0 z-50 bg-slate-400">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="cursor-pointer text-3xl font-bold text-yellow-400 ">
                ViZ
              </span>
              {/* <Image
                className="h-10 w-auto"
                src="/logo.png"
                alt="Echo Chamber"
                width={500}
                height={500}
              /> */}
            </Link>
          </div>
          <div className="row-auto flex items-center gap-5 sm:gap-10">
            <Image
              className="h-6  w-auto cursor-pointer sm:h-10"
              src="/grameen-logo.svg"
              alt="grameen-logo"
              width={500}
              height={500}
            />
            <Image
              className="h-10 w-auto cursor-pointer sm:h-14"
              src="/protean_logo.svg"
              alt="protean-logo"
              width={500}
              height={500}
            />
          </div>
        </nav>
      </header>
      <main className="h-screen bg-slate-100 p-5 pt-28">
        <div>
          <Map />
        </div>
      </main>
    </div>
  );
}
