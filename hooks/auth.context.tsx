'use client';

import React, { Dispatch,createContext, useReducer, useEffect} from 'react';
import { UserModel } from './../model/UserModel';
import { useRouter } from 'next/navigation';
import axios from './../lib/axios'

import { setCookie, getCookie, deleteCookie, CookieValueTypes } from "cookies-next";


type StateType = {
  user: UserModel,
  isLoading: boolean,
  token: CookieValueTypes,
};

type ActionType = {
  type: string,
  user: UserModel,
};
const initialState: StateType = {
    user: {}as UserModel ,
    isLoading: false,
    token: getCookie('api_token'),
};

const reducer =  (state: StateType, action: ActionType) => {
  switch  (action.type) {
    case "LOGIN":      
      return { ...state, user: action.user, token: action.user.api_token };
    case "LOGOUT":
      deleteCookie('api_token');
      return { ...state, token: "", user: {} as UserModel };
    case "REGISTER":
      return { ...state, token: "register" };
    default:
      return state;
  }
};


export const AuthUserContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });


// const AuthUserContext = createContext({
//   user: {}as UserModel,
//   // csrf,
//   login: async () => {},
//   logout: async () => {},
//   register: async () => {},
//   isLoading: false,
//   token: null,
// });
// export const AuthUserContext = createContext<{
//     state: StateType;
//   }>({ state: initialState});
  

export function AuthWrapper( {
    children,
  }: {
    children: React.ReactNode;
  }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {

      
       if(state.token != null){
      // console.log("get user", token)
      // const { mutate, error, isLoading} = useSWR('/api/user',
      axios.get('/api/user',  { headers: { Authorization: "Bearer " + state.token } })
      .then(response => { 
        dispatch({ type: "LOGIN" , user:{...response.data, api_token: state.token}})
          // setUser(response.data); 
          // setError(response.data.data.error); 
          // return response.data.data
      })
      .catch(err => {
          console.log(err.response);
          // setToken(null)
          deleteCookie('api_token');
          dispatch({ type: "LOGOUT", user: {} as UserModel })

          // setUser({} as UserModel)
      })
      
      // if(error){
      //     setToken(null)
      //     setCookie('api_token', null);
      //     setUser(null)
      // }
  }
 
     
  }, [])
  return (
  <AuthUserContext.Provider value={{state, dispatch }}>
    {children}    
  </AuthUserContext.Provider>
    );
}
