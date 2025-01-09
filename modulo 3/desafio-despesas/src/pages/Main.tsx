import { useEffect, useState } from "react";
import { MonthYearParams } from "../components/MonthYearParams";
import { IDespesas } from "../model/despesas";
import { getDespesas, getFilterDespesas } from "../services/apiServices";
import { TableScreen } from "../components/TableScree";

export const months: string[] = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  
  export const years: number[] = [2020, 2021];

export function Main() {
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<number>(0);
  const [despesas, setDespesas] = useState<IDespesas[]>([]);

  function monthOnChange(inputValue: string | number) {
    setMonth(inputValue.toString());
  }

  function yearOnChange(inputValue: string | number) {
    setYear(Number(inputValue));
  }

  async function getDataFromAPI() {
    const data = await getDespesas();
    setDespesas(data);
  }

  async function filterDespesas(yearAndMonth: string) {
    const data = await getFilterDespesas(yearAndMonth);
    setDespesas(data);
  }

  useEffect(() => {
    if (month && year) {
      const monthNumber = ([...months].indexOf(month) + 1)
        .toString()
        .padStart(2, "0");
      const yearAndMonth = `${year}-${monthNumber}`;
      setDespesas([]);
      filterDespesas(yearAndMonth);
    }
  }, [month, year]);

  useEffect(() => {
    getDataFromAPI();
  }, []);

  return (
    <>
      <MonthYearParams
        months={months}
        month={month}
        years={years}
        year={year}
        monthOnChange={monthOnChange}
        yearOnChange={yearOnChange}
      />

      <div>
        {month && year ? (
          <p>
            Sua lista de despesas em <strong>{month}</strong> de <strong>{year}</strong>:
          </p>
        ) : (
          <p>Sua lista de despesas:</p>
        )}
      </div>

      <TableScreen despesas={despesas} />
    </>
  );
}
