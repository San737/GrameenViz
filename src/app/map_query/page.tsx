"use client";

import { useState } from "react";
import Map from "../_components/scatter_map";
import { BankName, Pincode, State } from "../_components/scatter_map/query";
import Image from "next/image";
import Link from "next/link";

export default function MapPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>();

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const renderComponent = () => {
    switch (selectedOption) {
      case "option1":
        return <State />;

      case "option2":
        return <BankName />;

      case "option3":
        return <Pincode />;

      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-50">
      <header className="absolute inset-x-0 top-0 z-50 bg-slate-100">
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
        <div className=" rounded-md border bg-slate-50 sm:px-20">
          <div className="row-auto mx-auto flex justify-around border-b py-2 ">
            Select based on:
            <label>
              <input
                type="radio"
                value="option1"
                checked={selectedOption === "option1"}
                onChange={handleOptionChange}
              />
              State
            </label>
            <label>
              <input
                type="radio"
                value="option2"
                checked={selectedOption === "option2"}
                onChange={handleOptionChange}
              />
              Bank Name
            </label>
            <label>
              <input
                type="radio"
                value="option3"
                checked={selectedOption === "option3"}
                onChange={handleOptionChange}
              />
              Pincode
            </label>
          </div>
          <div>{renderComponent()}</div>
        </div>
        <div>
          <Map />
        </div>
      </main>
    </div>
  );
}

// "NameOfBC": "Shilpi Kumari",
// "BankName": "Bank of Baroda",  -
// "State": "West Bengal",  -
// "District ": "EAST MIDNAPORE",  -
// "OfficeName": "Rangibasan SO",
// "Pincode": 721624,  -
// "CorporateBCName": "2DO TECHNOLOGIES PRIVATE LIMITED",
// "SNo": 1,
// "ContactNumber": 9421280154, -
// "Gender": "female",
// "Latitude": 22.42114,
// "Longitude": 87.32257
