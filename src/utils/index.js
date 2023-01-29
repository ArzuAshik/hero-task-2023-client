import toast from 'react-hot-toast';

//SUCCESS ALERT
export const successAlert = message => message && toast.success(message, { duration: 3000 });
// Error Alert
export const errorAlert = error => error && toast.error(error);

//SHOWING ERROR MESSAGE
export const handleErrorMessage = err =>
    err.response && (err.response.data.message || err.response.data.error)
        ? err.response.data.message || err.response.data.error
        : err.message || err.error;