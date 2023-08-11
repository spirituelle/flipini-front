import axios from './../lib/axios'
import { useRouter } from 'next/navigation';
import {useEffect, useState} from 'react'
// import {setApiToken} from './actions'
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { UserModel } from './../model/UserModel';

export default function useAuth() {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState(getCookie('api_token'));
    const [user, setUser] = useState<UserModel>({} as UserModel);
    const [error, setError] = useState();

    useEffect(() => {
        if (user || error) {
            setIsLoading(false);
        }
         if(token != null){
        // console.log("get user", token)
        // const { mutate, error, isLoading} = useSWR('/api/user',
        axios.get('/api/user',  { headers: { Authorization: "Bearer " + token } })
        .then(response => { 
            setUser(response.data); 
            // setError(response.data.data.error); 
            // return response.data.data
        })
        .catch(err => {
            console.log(err.response);
            setToken(null)
            deleteCookie('api_token');
            setUser({} as UserModel)
        })
        
        // if(error){
        //     setToken(null)
        //     setCookie('api_token', null);
        //     setUser(null)
        // }
    }
   
       
    }, [])
    // if(token != null){
    //     console.log("get user", token)
    //     const { mutate, error, isLoading} = useSWR('/api/user',
    //     () => axios.get('/api/user',  { headers: { Authorization: "Bearer " + token } })
    //     .then(response => { setUser(response.data.data); setError(response.data.data.error); return response.data.data})
    //     .catch(err => {
    //         cosnole.log(err.response);
    //         setToken(null)
    //         setCookie('api_token', null);
    //         setUser(null)
    //     })
    //     )
    //     if(error){
    //         setToken(null)
    //         setCookie('api_token', null);
    //         setUser(null)
    //     }
    // }
   

    // const csrf = () => axios.get('/sanctum/csrf-cookie')
    const login = async ({setErrors, email, password}: {setErrors: any, email: string, password: string}) => {
        setErrors([])

        // let csrf= await csrf();
            await axios
            .post('/api/login', {email, password})
            .then( async (res) => {
                if(res.data){
                    setCookie('api_token', res.data.data.api_token);
                    setToken(res.data.data.api_token);
                    setUser(res.data.data)
                    // mutate();
                    return res 
                }
                else return null
               
            })
            .catch(error => {
                if (error.response?.status != 422) throw error

                setErrors(Object.values(error.response.data.errors).flat())
            })
       
       
    }
    const register = async ({setErrors, email, password, confirm_password, username}: {setErrors: any, email: string, password: string, confirm_password:string, username:string}) => {
        setErrors([])

        // let csrf= await csrf();
            await axios
            .post('/api/register', {email, password, confirm_password, username})
            .then( async (res) => {
                if(res.data){
                    setCookie('api_token', res.data.data.api_token);
                    setToken(res.data.data.api_token);
                    setUser(res.data.data)
                    // mutate();
                    return res 
                }
                else return null
               
            })
            .catch(error => {
                if (error.response?.status != 422) throw error

                setErrors(Object.values(error.response.data.errors).flat())
            })
       
       
    }

    const logout = async () => {
        // await axios.post('/api/logout')
        await deleteCookie('api_token');
        setToken(null);
        setUser({} as UserModel)
        // mutate(null)

        router.push('/')
    }

    return {
        user ,
        // csrf,
        login,
        logout,
        register,
        isLoading,
        token
    }
}