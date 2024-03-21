"use client";

import React, { useState } from "react";
import { BCData } from "../../../data/BC_with_cord";
import { useQuery } from "~/app/_context/queryHook";

interface mapType {
  SNo: number;
  NameOfBC: string;
  ContactNumber: number;
  Gender: string;
  BankName: string;
  State: string;
  District: string;
  OfficeName: string;
  Pincode: number;
  CorporateBCName: string;
  Latitude?: number;
  Longitude?: number;
}

export function State() {
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [districts, setDistricts] = useState<string[]>([]);
  const { setQuery } = useQuery();

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedState = event.target.value;
    setSelectedState(selectedState);

    const districtsForSelectedState = Array.from(
      new Set(
        BCData.filter((obj) => obj.State === selectedState).map(
          (obj) => obj.District,
        ),
      ),
    );
    setDistricts(districtsForSelectedState);
    setSelectedDistrict("");
  };

  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedDistrict(event.target.value);
  };

  const sortOptions = (options: string[]) => {
    return options.sort((a, b) => a.localeCompare(b));
  };

  return (
    <div className="my-3 flex flex-col items-center justify-center gap-6 sm:flex-row ">
      {/* <div className="flex items-center justify-center"> */}
      <select
        value={selectedState}
        className="w-40 rounded-sm border p-1 indent-3 sm:mr-5"
        onChange={handleStateChange}
      >
        <option value="">Select State</option>
        {sortOptions(Array.from(new Set(BCData.map((obj) => obj.State)))).map(
          (state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ),
        )}
      </select>

      <select
        value={selectedDistrict}
        className="w-40 rounded-sm border p-1 indent-3"
        onChange={handleDistrictChange}
      >
        <option value="">Select District</option>
        {sortOptions(districts).map((district) => (
          <option key={district} value={district}>
            {district}
          </option>
        ))}
      </select>
      {/* </div> */}

      <button
        className="my-4 rounded bg-blue-600 px-3 py-1  font-bold text-white hover:bg-blue-700"
        onClick={() => {
          setQuery({
            key: "State&District",
            value: selectedState + "&" + selectedDistrict,
          });
        }}
      >
        Apply
      </button>
    </div>
  );
}

export function BankName() {
  const [selectedBankName, setSelectedBankName] = useState<string>("");
  const { setQuery } = useQuery();

  const handleBankNameChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedBankName(event.target.value);
  };

  const sortOptions = (options: string[]) => {
    return options.sort((a, b) => a.localeCompare(b));
  };

  const uniqueBankNames = sortOptions(
    Array.from(new Set(BCData.map((obj: mapType) => obj.BankName))),
  );

  return (
    <div className="my-3 flex flex-col items-center justify-center gap-6 sm:flex-row ">
      <select
        value={selectedBankName}
        className="w-50 rounded-sm border p-1 indent-3"
        onChange={handleBankNameChange}
      >
        <option value="">Select Bank Name</option>
        {uniqueBankNames.map((bankName) => (
          <option key={bankName} value={bankName}>
            {bankName}
          </option>
        ))}
      </select>
      <button
        className="my-4 rounded bg-blue-600 px-3 py-1  font-bold text-white hover:bg-blue-700"
        onClick={() => {
          setQuery({ key: "BankName", value: selectedBankName });
        }}
      >
        Apply
      </button>
    </div>
  );
}

export function Pincode() {
  const [selectedPincode, setSelectedPincode] = useState<number | null>(null);
  const { setQuery } = useQuery();

  const handlePincodeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPincode(parseInt(event.target.value, 10) || null);
  };

  const sortOptions = (options: number[]) => {
    return options.sort((a, b) => a - b);
  };

  const uniquePincodes = sortOptions(
    Array.from(new Set(BCData.map((obj: mapType) => obj.Pincode))),
  );

  return (
    <div className="row-auto my-3 flex flex-col items-center justify-center gap-6 sm:flex-row ">
      <select
        value={selectedPincode ?? ""}
        className="w-40 rounded-sm border p-1 indent-3"
        onChange={handlePincodeChange}
      >
        <option value="">Select Pincode</option>
        {uniquePincodes.map((pincode) => (
          <option key={pincode} value={pincode}>
            {pincode}
          </option>
        ))}
      </select>

      <button
        className="my-4 rounded bg-blue-600 px-3 py-1  font-bold text-white hover:bg-blue-700"
        onClick={() => {
          setQuery({
            key: "Pincode",
            value: selectedPincode?.toString() ?? "",
          });
        }}
      >
        Apply
      </button>
    </div>
  );
}
