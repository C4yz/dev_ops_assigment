import { toast, ToastContainer } from "react-toastify";

function errorMessage(error){
   
    toast.error(error, {position: toast.POSITION.TOP_CENTER})

   return(
       <div>
           <ToastContainer>errorMessage</ToastContainer>
       </div>
   )
}
export default errorMessage;