const CandidateCard = ({ candidate, index }) => {
  return (
    <div className="border p-2 w-32 h-48 shadow-md flex flex-col items-center justify-center">
      <img
        className="w-12 h-12 rounded-full"
        src={`../src/assets/img/${candidate.username}.png`}
        alt=""
      />
      <p>{candidate.percent.toFixed(2)}%</p>
      <p>{candidate.votes} votos</p>
      <p>{candidate.name}</p>
      <p>{index === 0 ? "Eleito" : "Não eleito"}</p>
    </div>
  );
};

export default CandidateCard;
