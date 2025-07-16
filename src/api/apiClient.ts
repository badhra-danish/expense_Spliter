import axios from "axios";
import type { AxiosInstance } from "axios";
import Cookies from "js-cookie";

const BASEURL = import.meta.env.VITE_BASE_API_URL;
const Api:AxiosInstance = axios.create({
  baseURL: BASEURL
});
const token = Cookies.get("Token")
const id = Cookies.get("UserId");
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
/* Get User By There Id */

export const GetUserbyId = () => {
  try{

    const response  =  Api.get("/user" , {
      params: {
        search : id
      }, 
      headers: {
            Authorization: `Bearer ${token}`,
          },
    })
    return response;
  }catch(error){
    console.error("Error for get User" ,error);
  }
}

/* For Update The User Profile */
export const UpdateUserData  = async (formData : FormData , id:string) => {
  try {
    const response = await Api.patch(`/user/${id}` ,
      formData ,
      {
         headers: {
          Authorization:`Bearer ${token}`
         }
      }
    )
    return response;
  }
  catch(error){
    console.error("Error Updating User Data" ,error)
  }
}
/* Delete User  by ther there id */

export const DeleteUser = async () => {
   try{
    const response = await Api.delete( `user/${id}` , {
      headers: {
        Authorization:`Bearer ${token}`
      }
    })
    return response;
   }catch(error){
    console.error("Error In the Delete Users" ,error);
   }
}


/* Create Groupe*/

export const CreateGroup = async (formData : FormData) => {
  try{
    const response = await Api.post("/group" ,
      formData  ,
      {
      headers:{
        Authorization : `Bearer ${token}`
      }
    }
  )
  return response;
} catch(error){
  console.error("Error Creating Group" , error)
}
}
