import { IDespesas } from "../model/despesas";

export async function getFilterDespesas(yearAndMonth: string): Promise<IDespesas[]> {
    const res = await fetch(`http://localhost:5000/despesas?mes=${yearAndMonth}&_sort=dia`);
    const data = await res.json();
    return data;
}

export async function getDespesas(): Promise<IDespesas[]> {
    const res = await fetch(`http://localhost:5000/despesas`);
    const data = await res.json();
    return data;
}