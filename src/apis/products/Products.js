import axios from "axios";
import { API_URL } from "../../constants/Keys";

export const GetNonPrescriptionProducts = async () => {
    const response = await axios.get(`${API_URL}/products/get/no-prescription-products`)

    return response.data.data;
}