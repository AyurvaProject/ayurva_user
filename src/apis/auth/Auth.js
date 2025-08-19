import axios from "axios";
import { API_URL } from "../../constants/Keys";

export const SignUp = async (data) => {
    const response = await axios.post(`${API_URL}/auth/register/user`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
    await axios.post(`${API_URL}/carts`,{
        userId: response.data.user.id
    });

    return response.data;
} 

export const VerifyOtp = async (data, id) => {
  await axios.post(`${API_URL}/auth/verify-otp/${id}`, data,
    {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }
  )
}

export const ResendOtp = async (id,data) => {
  await axios.post(`${API_URL}/auth/resend-otp/${id}`,data,{
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
}

export const GetOneUser = async (id) => {
  const response = await axios.get(`${API_URL}/users/${id}`)

  return response.data.data;
}

export const Login = async (data) => {
 const response = await axios.post(`${API_URL}/auth/login`, data)
       
    if (response.data.access_token){
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    console.log("Inside API Function",response.data.user);
    return response.data.user;
}

export const Logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export const GetCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    try {
        const user = JSON.parse(userStr);
        return user;
    } catch (error) {
        return null;
    }
}

export const GetCurrentToken = () => localStorage.getItem("token");

export const IsTokenExpired =(token) => {
    try{
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        if (decodedToken.exp < Date.now() / 1000) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return true;
    }
}