import axios from "axios";
import { API_URL } from "../../constants/Keys";

export const GetDeliveryOrgById = async (id) => {
    const response = await axios.get(`${API_URL}/delivery-organizations/${id}`,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })

    return response.data.data;
}