import Cookies from "js-cookie";

export const Authentication = () => {
    const Token  = Cookies.get("Token");

    if(!Token) return false;

    try{
      const user = Token
       return !!user;
    }catch(error){
      console.error("User Not Found" , error);
      
    }
}
