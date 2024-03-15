import Image from "next/image";
import Link from "next/link";

export default function Navbarr() {
  return (
    <div className=" flex h-16 items-center  justify-between bg-cyan-800 p-8 shadow-md shadow-slate-600 ">
      <Link href={`/`} className="-m-1.5 p-1.5">
        <div>
          <Image
            className="h-10 w-auto"
            src="/logo.png"
            alt="Echo Chamber"
            width={500}
            height={500}
          />
        </div>
      </Link>
      <div>
        <input
          className="h-8 rounded-md bg-slate-200 indent-3 "
          type="text"
          placeholder="search"
        />
      </div>
      <div>
        <button>upload</button>
      </div>
    </div>
  );
}
