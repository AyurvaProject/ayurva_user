import axios from "axios";
import { API_URL } from "../../constants/Keys";

export const IsAddressAvailableForUser = async (id) => {
    const response = await axios.get(`${API_URL}/addresses/check-address-availability/${id}`,{
        headers:{
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })

    return response.data.data;
}