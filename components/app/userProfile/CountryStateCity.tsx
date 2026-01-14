"use client";

import { useEffect, useState } from "react";

type Props = {
  country: string;
  state: string;
  city: string;
  setCountry: (v: string) => void;
  setState: (v: string) => void;
  setCity: (v: string) => void;
};

export default function CountryStateCity({
  country,
  state,
  city,
  setCountry,
  setState,
  setCity,
}: Props) {
  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  // Load countries
  useEffect(() => {
    import("country-state-city").then((m) => {
      setCountries(m.Country.getAllCountries());
    });
  }, []);

  // Load states when country changes
  useEffect(() => {
    if (!country) {
      setStates([]);
      setCities([]);
      return;
    }

    import("country-state-city").then((m) => {
      setStates(m.State.getStatesOfCountry(country));
      setCities([]);
    });
  }, [country]);

  // Load cities when state changes
  useEffect(() => {
    if (!state) {
      setCities([]);
      return;
    }

    import("country-state-city").then((m) => {
      setCities(m.City.getCitiesOfState(country, state));
    });
  }, [country, state]);

  return (
    <div className="flex w-full gap-4 md:col-span-2">
      {/* Country */}
      <select
        className="w-full max-w-[33%] truncate border border-gray-300 rounded-md px-3 py-2
        focus:outline-none focus:ring-2 focus:ring-lime-500 text-gray-700"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      >
        <option value="">Select Country</option>
        {countries.map((c) => (
          <option key={c.isoCode} value={c.isoCode} title={c.name}>
            {c.name}
          </option>
        ))}
      </select>

      {/* State */}
      <select
        className="w-full max-w-[33%] truncate border border-gray-300 rounded-md px-3 py-2
        focus:outline-none focus:ring-2 focus:ring-lime-500 text-gray-700"
        value={state}
        onChange={(e) => setState(e.target.value)}
        disabled={!country || states.length === 0}
      >
        <option value="">Select State</option>
        {states.map((s) => (
          <option key={s.isoCode} value={s.isoCode} title={s.name}>
            {s.name}
          </option>
        ))}
      </select>

      {/* City */}
      <select
        className="w-full max-w-[33%] truncate border border-gray-300 rounded-md px-3 py-2
        focus:outline-none focus:ring-2 focus:ring-lime-500 text-gray-700"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        disabled={!state || cities.length === 0}
      >
        <option value="">Select City</option>
        {cities.map((c) => (
          <option key={c.name} value={c.name} title={c.name}>
            {c.name}
          </option>
        ))}
      </select>
    </div>
  );
}
