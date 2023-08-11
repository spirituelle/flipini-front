'use server';

// import { cookies } from 'next/headers';
import { setCookie } from "cookies-next";

export async function setApiToken(api_token: string) {
    setCookie('api_token', api_token);
   
  }
  