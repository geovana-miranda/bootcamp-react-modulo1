import axios from "axios";

const axiosInstance = axios.create({baseURL: "http://localhost:3001/", timeout: 10000});

export async function getCities(url){
    const {data} = await axiosInstance.get(url);
    return data;
}

export async function getCandidates(url) {
    const {data} = await axiosInstance.get(url);
    return data;
}

export async function getElection(url){
    const {data} = await axiosInstance.get(url);
    return data;
}