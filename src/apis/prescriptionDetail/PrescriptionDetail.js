import axios from "axios";
import { API_URL } from "../../constants/Keys";
import { GetCurrentUser } from "../auth/Auth";

export const ChangePrescriptionDetailStatus = async (prescriptionDetId, status) => {
    await axios.post(`${API_URL}/prescription-detail/change-status/${prescriptionDetId}`, {
        status: status
    },
    {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
}

export const GetPrescriptionDetailById = async (id) => {
    const response = await axios.get(`${API_URL}/prescription-detail/${id}`,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    return response.data.data;
}