import { loginFailure, loginStart, loginSuccess } from "./userSlice";
import { publicRequest } from "../utils/requestMethods";

export const login = async (dispatch, user) => {
    dispatch(loginStart())
    try {
        const res = await publicRequest.post('/auth/logIn/', user)
        console.log(res.data)
        dispatch(loginSuccess(res.data))
    } catch (err) {
        dispatch(loginFailure())
    }

}