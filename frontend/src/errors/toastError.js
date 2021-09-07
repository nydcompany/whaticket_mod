import { toast } from "react-toastify";
import { i18n } from "../translate/i18n";

const toastError = (err) => {
  const errorMsg = err.response?.data?.error;
  if (errorMsg) {
    if (i18n.exists(`backendErrors.${errorMsg}`)) {
      toast.error(i18n.t(`backendErrors.${errorMsg}`), {
        toastId: errorMsg,
      });
    } else {
      toast.error(errorMsg, {
        toastId: errorMsg,
      });
    }
  } else {
    toast.error("Erro de Rede! Por gentileza recarregue a página.");
    console.log(err);
  }
};

export default toastError;
