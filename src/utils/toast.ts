import { toast, ToastOptions } from 'react-toastify';

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
    error,
    warn,
    success
}