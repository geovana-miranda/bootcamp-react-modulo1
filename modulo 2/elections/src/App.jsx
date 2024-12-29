import { useState } from "react";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { apiGetCities } from "./services/apiService";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import Eletions from "./components/Eletions";

export default function App() {
  const [allCities, setAllCities] = useState("");

  useEffect(() => {
    (async function getAllCities() {
      try {
        const backendAllCities = await apiGetCities();
        setAllCities(backendAllCities);
      } catch (erro) {
        console.log(erro.message);
      }
    })();
  }, []);

  return (
    <>
      <Header>
        <h1>react-elections</h1>
      </Header>

      <Main>
        {!allCities ? (
          <div className="text-center">
            <ClipLoader />
          </div>
        ) : (
          <Eletions cities={allCities}/>
          
        )}

      </Main>
    </>
  );
}
