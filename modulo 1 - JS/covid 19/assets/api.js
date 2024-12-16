export async function requestCountry() {
    try {
      const res = await axios.get(
        `https://covid-api.com/api/regions?order=name&sort=asc`
      );
      const countries = res.data.data;
      return countries;
    } catch (error) {
      console.log("Erro ao fazer a requisição de países", error);
    }
  }
  
  export async function requestAPI(dataDaBusca, paisQueQueroBuscar) {
    try {
      const res = await axios.get(
        `https://covid-api.com/api/reports/total?date=${dataDaBusca}&iso=${paisQueQueroBuscar}%20`);
      return res.data.data;
    } catch (error) {
      console.log("Erro ao fazer a requisição", error);
    }
  }
  