import axios from "axios";
import { API_URL } from "../../constants/Keys";
import { GetCurrentUser } from "../auth/Auth";

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

export const GetNearProducts = async (licenseNo) => {
    const response = await axios.get(`${API_URL}/products/get/near-products-by-license-no/${licenseNo}/${GetCurrentUser().id}`,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })

    return response.data.data;
}