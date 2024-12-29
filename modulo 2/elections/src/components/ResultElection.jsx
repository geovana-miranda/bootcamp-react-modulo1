import CandidateCard from "./CandidateCard";

const ResultElection = ({ data }) => {
  const { city, sanitizedElection: candidates } = data;
  return (
    <div className="border p-4 m-4">
      <div className="flex flex-col items-center justify-center space-y-2">
        <p className="font-semibold">Eleição em {city.name}</p>
        <div className="flex justify-center space-x-4">
          <p>
            <span className="font-semibold">Total de eleitores:</span>{" "}
            {city.votingPopulation}
          </p>
          <p>
            <span className="font-semibold">Abstenção:</span> {city.absence}
          </p>
          <p>
            <span className="font-semibold">Comparecimento:</span>{" "}
            {city.presence}{" "}
          </p>
        </div>
        <p>{candidates.length} candidatos</p>
      </div>
      <div className="border flex justify-between space-x-2">
        {candidates.map((candidate, i) => {
          return <CandidateCard key={candidate.id} candidate={candidate} index={i} />;
        })}
      </div>
    </div>
  );
};

export default ResultElection;
