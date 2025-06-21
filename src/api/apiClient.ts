import axios from "axios";
import type { AxiosInstance } from "axios";

const BASEURL = 'http://192.168.0.143:8000/api'
const Api:AxiosInstance = axios.create({
  baseURL: BASEURL
});


{
  /* Fot the Post  or the create the Acounnt*/
}

export const CreateAccount = async (fromdata: FormData) => {
  try {
    const response = await Api.post("/user",
      fromdata
    );
    return response;
  } catch (error) {
    console.error("Failed To SignUp", error);
    throw error;
  }
};

{
  /* Fot the Login post*/
}

export const LoginUser = async (body: object) => {
  try {
    const response = await Api.post(
      "user/login",
      body
    );
    return response;
  } catch (error) {
    console.log("Error During Login", error);
  }
};
