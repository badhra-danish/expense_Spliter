import axios from "axios";
import type { AxiosInstance } from "axios";

const BASEURL = 'https://paratapay-backend.onrender.com/api'
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

/* For Update The User Profile */
export const UpdateUserData  = async (formData : FormData , id:string) => {
  try {
    const response = await Api.patch(`/user/${id}` ,
      formData ,
      {
         headers: {
          Authorization:`Bearer ${localStorage.getItem("Token")}`
         }
      }
    )
    return response;
  }
  catch(error){
    console.error("Error Updating User Data" ,error)
  }
}

/* Create Groupe*/

export const CreateGroup = async (formData : FormData) => {
  try{
    const response = await Api.post("/group" ,
      formData  ,
      {
      headers:{
        Authorization : `Bearer ${localStorage.getItem("Token")}`
      }
    }
  )
  return response;
} catch(error){
  console.error("Error Creating Group" , error)
}
}
