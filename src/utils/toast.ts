import { toast, ToastOptions } from 'react-toastify';
import { parseBackendError } from './functions';

const toastOptions: ToastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
};

const errorFromError = (err: any) => {
    toast.error(parseBackendError(err).join("\n"))
}

const error = (message: string) => {
    console.log("ASD");
        
    toast.error(message, toastOptions);
}

const warn = (message: string) => {
    toast.warn(message, toastOptions);
}

const success = (message: string) => {
    toast.success(message, toastOptions);
}

export default {
    errorFromError,
    error,
    warn,
    success
}