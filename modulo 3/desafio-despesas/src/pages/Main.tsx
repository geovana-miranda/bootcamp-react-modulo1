import { useState } from "react";
import { MonthYearParams } from "../components/MonthYearParams";

import { TableDetails } from "../components/TableDetails";
import { TableResume } from "../components/TableResume";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useDespesas } from "../hooks/useDespesas";

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
  const [month, setMonth] = useState<string>("Janeiro");
  const [year, setYear] = useState<number>(2021);
  const [tab, setTab] = useState(0);

  const {
    despesas,
    total,
    despesasCategoria,
  } = useDespesas(month, year);

  function monthOnChange(inputValue: string | number) {
    setMonth(inputValue.toString());
  }

  function yearOnChange(inputValue: string | number) {
    setYear(Number(inputValue));
  }

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
      <Tabs centered value={tab} onChange={(e, newTab) => setTab(newTab)}>
        <Tab label="Resumo" />
        <Tab label="Detalhes" />
      </Tabs>

      <div>Total: <strong>{total}</strong></div>

      {tab === 0 ? (
        <TableResume despesas={despesasCategoria} />
      ) : (
        <TableDetails despesas={despesas} />
      )}
    </>
  );
}
