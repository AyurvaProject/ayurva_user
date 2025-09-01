import axios from "axios";
import { API_URL } from "../../constants/Keys";
import { GetCurrentUser } from "../auth/Auth";

export const CreateOrder = async (data) => {
    const response = await axios.post(`${API_URL}/orders`, data, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    return response.data.data;
}

export const GetOrdersByUserId = async (status) => {
    const response = await axios.get(`${API_URL}/orders/get/by-user/${GetCurrentUser().id}/${status}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    return response.data.data;
}