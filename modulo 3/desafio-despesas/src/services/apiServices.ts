import { IDespesas } from "../model/despesas";
import { IUsers } from "../model/users";

export async function getFilterDespesas(yearAndMonth: string): Promise<IDespesas[]> {
    const res = await fetch(`http://localhost:3001/despesas?mes=${yearAndMonth}&_sort=dia`, {
        credentials: "include",
    });
    const data = await res.json();
    return data;
}

export async function getDespesas(): Promise<IDespesas[]> {
    const res = await fetch(`http://localhost:3001/despesas`, {
        credentials: "include",
    });
    const data = await res.json();
    return data;
}

export async function startSession(email: string, senha: string): Promise<IUsers> {
    const res = await fetch(`http://localhost:3001/sessao/criar` , {
        method: "POST",
        body: JSON.stringify({email, senha}),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    const data = await res.json();
    return data;
} 

export async function finishSession(): Promise<void> {
    const res = await fetch(`http://localhost:3001/sessao/finalizar`, {
        method: "POST",
        credentials: "include",
    })
    const data = await res.json();
    return data;
}

export async function findUser(): Promise<IUsers> {
    const res = await fetch(`http://localhost:3001/sessao/usuario`, {
        credentials: "include",
    });
    const data = await res.json();
    return data; 
}