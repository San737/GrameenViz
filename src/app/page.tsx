// import Image from "next/image";
import Image from "next/image";
import Link from "next/link";

export default function homePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center overflow-y-hidden bg-slate-50">
      <header className="absolute inset-x-0 top-0 z-50 bg-slate-50">
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

      <div className="relative isolate px-6 pt-10 lg:px-8">
        <div className="mx-auto max-w-2xl py-20 sm:py-32 lg:py-40">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Grameen <span className="text-yellow-600 ">ViZ</span>
              {/* <span>
                <Image
                  className="m-2 inline h-14 w-auto lg:h-20"
                  src="/logo.png"
                  alt="Echo Chamber"
                  width={500}
                  height={500}
                />
              </span> */}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Vizualizing the Grameen Community for a better tomorrow.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/map_query"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Query the dataset
              </Link>
              {/* <Link
                href="/map_population"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Population Map
              </Link> */}
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
