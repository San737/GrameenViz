"use client";

import React, { useState } from "react";
import * as BCData from "../../../data/BC_with_cord.json";
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
    <div>
      <select value={selectedState} onChange={handleStateChange}>
        <option value="">Select State</option>
        {sortOptions(Array.from(new Set(BCData.map((obj) => obj.State)))).map(
          (state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ),
        )}
      </select>

      <select value={selectedDistrict} onChange={handleDistrictChange}>
        <option value="">Select District</option>
        {sortOptions(districts).map((district) => (
          <option key={district} value={district}>
            {district}
          </option>
        ))}
      </select>

      <div>
        <p>Selected State: {selectedState}</p>
        <p>Selected District: {selectedDistrict}</p>
        <button
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
    <div>
      <h3>Bank Name</h3>
      <select value={selectedBankName} onChange={handleBankNameChange}>
        <option value="">Select Bank Name</option>
        {uniqueBankNames.map((bankName) => (
          <option key={bankName} value={bankName}>
            {bankName}
          </option>
        ))}
      </select>
      <p>Selected Bank Name: {selectedBankName}</p>
      <button
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
    <div>
      <h3>Pincode</h3>
      <select value={selectedPincode ?? ""} onChange={handlePincodeChange}>
        <option value="">Select Pincode</option>
        {uniquePincodes.map((pincode) => (
          <option key={pincode} value={pincode}>
            {pincode}
          </option>
        ))}
      </select>
      <p>Selected Pincode: {selectedPincode ?? "N/A"}</p>
      <button
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
