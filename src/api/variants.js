import axios from "axios";

const API_URL = "https://psq-test.vercel.app:3000"

// Имитация GET запроса
export function getVariants() {
    return axios.get(`${API_URL}/variants`)
}