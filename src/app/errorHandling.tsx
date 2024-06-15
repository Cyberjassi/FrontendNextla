
import Swal from "sweetalert2";

export const  handleApiError = (message:string[]) => {
  Swal.fire({
      title: message,
      icon: 'error',
      toast: true,
      timer: 3000,
      position: 'top-right',
      timerProgressBar: true,
      showConfirmButton: false,
  });
};
