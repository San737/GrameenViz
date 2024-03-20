"use client";

import { useState } from "react";
// import Map from "../_components/scatter_map/map";
import { BankName, Pincode, State } from "../_components/scatter_map/query";

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
      <header className="fixed left-0 right-0 top-0 z-50 h-12 bg-slate-500 p-3">
        tab
      </header>
      <main className="mt-12 h-[1000px] bg-red-400">
        <div>
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
        <div>
          <div>{renderComponent()}</div>
        </div>
        <div>{/* <Map /> */}</div>
      </main>
      <footer className="bg-slate-500">footer</footer>
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
