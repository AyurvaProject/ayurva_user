import axios from "axios";
import { API_URL } from "../../constants/Keys";
import { GetCurrentUser } from "../auth/Auth";

export const GetNearPharmacyByUserId = async () => {
    const response = await axios.get(`${API_URL}/pharmacies/get/nearest-pharmacies-by-user/${GetCurrentUser().id}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    return response.data.data;
}

export const GetAllPharmacies = async () => {
    const response = await axios.get(`${API_URL}/pharmacies`)
    return response.data.data;
}

export const GetOnePharmacy = async (id) => {
    const response = await axios.get(`${API_URL}/pharmacies/${id}`)
    return response.data.data;
}

export const GetSameDistrictPharmaciesByUserId = async () => {
    const response = await axios.get(`${API_URL}/pharmacies/get/same-district-pharmacies-by-user/${GetCurrentUser().id}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    return response.data.data;
}