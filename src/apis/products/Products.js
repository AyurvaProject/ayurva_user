import axios from "axios";
import { API_URL } from "../../constants/Keys";

export const GetNonPrescriptionProducts = async () => {
    const response = await axios.get(`${API_URL}/products/get/no-prescription-products`)

    return response.data.data;
}

export const GetNoPrescriptionProductsByPharmacyId = async (id) => {
    const response = await axios.get(`${API_URL}/products/get/no-prescription-products-by-pharmacy/${id}`)

    return response.data.data;
}

export const GetOneProductById = async (id) => {
    const response = await axios.get(`${API_URL}/products/${id}`)

    return response.data.data;
}