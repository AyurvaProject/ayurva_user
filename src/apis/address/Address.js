import axios from "axios";
import { API_URL } from "../../constants/Keys";
import { GetCurrentUser } from "../auth/Auth";

export const IsAddressAvailableForUser = async (id) => {
    const response = await axios.get(`${API_URL}/addresses/check-address-availability/${id}`,{
        headers:{
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })

    return response.data.data;
}

export const CreateAddress = async (data) => {
    const response = await axios.post(`${API_URL}/addresses`, data, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    return response.data.data;
}

export const UpdateAddress = async (id, data) => {
    const response = await axios.patch(`${API_URL}/addresses/${id}`, data, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    return response.data.data;
}

export const GetAddressesByUserId = async (id) => {
    const response = await axios.get(`${API_URL}/addresses/get/user-addresses/${id}`)
    return response.data.data;
}

export const GetOneAddress = async (id) => {
    const response = await axios.get(`${API_URL}/addresses/${id}`)
    return response.data.data;
}

export const ChangeUserSelectedAddredss = async (addressId) => {
    await axios.post(`${API_URL}/users/change-selected-address/${GetCurrentUser().id}/${addressId}`,{},{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
}

export const DeleteAdrress = async (id) => {
    await axios.delete(`${API_URL}/addresses/${id}`,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
}