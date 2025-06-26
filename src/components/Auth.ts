

export const Authentication = () => {
    const storedUser  = localStorage.getItem("Users")

    if(!storedUser) return false;

    try{
      const user = JSON.parse(storedUser)
       return !!user.id; 
    }catch(error){
      console.error("User Not Found" , error);
      
    }
}
