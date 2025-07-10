

export const Authentication = () => {
    const Token  = localStorage.getItem("Token");

    if(!Token) return false;

    try{
      const user = JSON.parse(Token)
       return !!user;
    }catch(error){
      console.error("User Not Found" , error);
      
    }
}
