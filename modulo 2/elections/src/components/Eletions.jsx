import { useEffect, useState } from "react";
import ResultElection from "./ResultElection";
import { apiGetElection } from "../services/apiService";
import { ClipLoader } from "react-spinners";

const Eletions = ({ cities }) => {
  const [selectedCity, setSelectedCity] = useState(cities[0].id);
  const [election, setElection] = useState("");

  useEffect(() => {
    if (!selectedCity) return;
    setElection("");
    apiGetElection(selectedCity).then((res) => setElection(res));
  }, [selectedCity]);

  return (
    <>
      <div className="text-center my-3">
        <p>Escolha o município</p>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.currentTarget.value)}
          className="p-1 bg-white border m-2 shadow-md"
          name="cities"
          id="cities"
        >
          {cities.map((city) => {
            return (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            );
          })}
        </select>
      </div>

      {election ? (
        <ResultElection data={election} />
      ) : (
        <div>
          <ClipLoader />
        </div>
      )}
    </>
  );
};

export default Eletions;
