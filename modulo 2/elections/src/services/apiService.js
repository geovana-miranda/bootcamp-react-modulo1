import { getCities, getCandidates, getElection } from "./httpService";

export async function apiGetCities() {
  const allCities = await getCities("/cities");
  const sortedCities = allCities.toSorted((a, b) =>
    a.name.localeCompare(b.name)
  );
  return sortedCities;
}

export async function apiGetCandidates() {
  const allCandidates = await getCandidates("/candidates");
  return allCandidates;
}

export async function apiGetElection(cityId) {
  const candidates = await apiGetCandidates();
  const cities = await apiGetCities();

  const city = cities.find((city) => city.id === cityId);

  const election = await getElection(`/election?cityId=${cityId}`);

  const sanitizedElection = election
    .toSorted((a, b) => b.votes - a.votes)
    .map((item) => {
      const { cityId, candidateId, ...fieldsToKeep } = item;
      const currentCandidate = candidates.find(
        (candidate) => candidate.id === item.candidateId
      );

      const percent = (fieldsToKeep.votes / city.presence) * 100;
      return { ...fieldsToKeep, ...currentCandidate, percent };
    });
  return { city, sanitizedElection };
}
