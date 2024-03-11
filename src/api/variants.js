import axios from "axios";

const API_URL = "http://localhost:3000"

// Имитация GET запроса
export function getVariants() {
    return axios.get(`${API_URL}/variants`)
}