import axios from "axios";
import { API_URL } from "../../constants/Keys";
import { GetCurrentUser } from "../auth/Auth";

export const CreatePrescriptionOrder = async (data) => {
    const response = await axios.post(`${API_URL}/prescription-orders`, data, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    return response.data.data;
}

export const GetPrescriptionOrdersByUserId = async (status) => {
    const response = await axios.get(`${API_URL}/prescription-orders/get/by-user-id/${GetCurrentUser().id}/${status}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    return response.data.data;
}