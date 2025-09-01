import axios from "axios";
import { API_URL } from "../../constants/Keys";
import { GetCurrentUser } from "../auth/Auth";

export const CreatePrescription = async (data) => {
    const response = await axios.post(`${API_URL}/prescriptions`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    return response.data.data;
}

export const GetPendingPrescriptionsByUserId = async () => {
    const response = await axios.get(`${API_URL}/prescriptions/pending-prescriptions/${GetCurrentUser().id}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    console.log(response.data.data);
    return response.data.data;
}

export const GetReadPrescriptionsByUserId = async () => {
    const response = await axios.get(`${API_URL}/prescriptions/read-prescriptions/${GetCurrentUser().id}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    console.log(response.data.data);
    return response.data.data;
}

export const GetOnePres = async (id) => {
    const response = await axios.get(`${API_URL}/prescriptions/${id}`,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })

    return response.data.data;
}