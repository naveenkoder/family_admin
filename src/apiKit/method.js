import APIKit from "./apikit";
import { appConstants } from "../themes/constants";
import { toast } from "react-toastify";

// headers
const jsonHeader = { "access-control-allow-origin": "*", "Content-Type": "application/json", Accept: "application/json" }
const formDataHeader = { "access-control-allow-origin": "*", "Content-Type": "multipart/form-data", Accept: "application/json" }

let history = null;

export const getNavigate = (data) => history = data

// common api handler
const apiHandlerFunction = (handler) => {

    if (window.navigator.onLine) {

        return handler

            .then(result => { return { success: true, status: result.status, message: result.data.message, data: result?.data } })

            .catch((err) => {

                if (err?.response?.status) {

                    if (err?.response?.status >= 400 && err?.response?.status < 500) {

                        if (err?.response?.status === 401 || err?.response?.status === 403) {

                            toast.error(err.response.data.message, { toastId: "err" });
                            localStorage.clear();
                            history.push("/login")

                        }
                        return { success: false, status: err.response.request.status, message: err?.response?.data?.message }
                    }
                    else {

                        toast.error(appConstants.axiosConstants.messageStatus500, { toastId: "err" });
                        return { success: false, status: 500, message: appConstants.axiosConstants.messageStatus500 }
                    }
                }
                else {

                    toast.error(appConstants.axiosConstants.messageStatus500, { toastId: "err" });
                    return { success: false, status: 500, message: appConstants.axiosConstants.messageStatus500 }
                }
            })
    }
    else toast.error(appConstants.axiosConstants.offline, { toastId: "err" });
}

// Methods
export const Method = {

    // post method
    post: (url, body, formData) => apiHandlerFunction(APIKit.post(url, body, { headers: formData ? formDataHeader : jsonHeader })),

    // get method
    get: (url) => apiHandlerFunction(APIKit.get(url, { headers: jsonHeader })),

    // put method 
    put: (url, body, formData) => apiHandlerFunction(APIKit.put(url, body, { headers: formData ? formDataHeader : jsonHeader })),

    // delete method
    delete: (url, body) => apiHandlerFunction(APIKit.delete(url, { data: body }, { headers: jsonHeader })),
};

export default Method;
