import { useEffect, useMemo, useState } from "react";
import { months } from "../pages/Main";
import { getFilterDespesas } from "../services/apiServices";
import { IDespesas } from "../model/despesas";

export interface IDespesasCategoria {
  categoria: string;
  valorCategoria: number;
}

export function useDespesas(month: string, year: number) {
  const [despesas, setDespesas] = useState<IDespesas[]>([]);

  useEffect(() => {
    if (month && year) {
      const monthNumber = ([...months].indexOf(month) + 1)
        .toString()
        .padStart(2, "0");
      const yearAndMonth = `${year}-${monthNumber}`;
      getFilterDespesas(yearAndMonth).then((data) => {
        setDespesas(data);
      });
    }
  }, [month, year]);

  return useMemo(() => {
    const total = totalDespesas(despesas);
    const despesasCategoria = categorias(despesas);

    return {
      despesas,
      total,
      despesasCategoria,
    };
  }, [despesas]);

  function totalDespesas(despesas: IDespesas[]) {
    let total = 0;

    for (let despesa of despesas) {
      total += despesa.valor;
    }

    const formattedTotal = total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return formattedTotal;
  }

  function categorias(despesas: IDespesas[]) {
    const despesasCategoria: IDespesasCategoria[] = [];

    for (let despesa of despesas) {
      const categoria = despesasCategoria.find(
        (item) => item.categoria === despesa.categoria
      );

      if (categoria) {
        categoria.valorCategoria += despesa.valor;
      } else {
        despesasCategoria.push({
          categoria: despesa.categoria,
          valorCategoria: despesa.valor,
        });
      }
    }

    return despesasCategoria;
  }
}
