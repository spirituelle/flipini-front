'use client'
import Lottie from "lottie-react";
import LoadingLottie from './../assets/lottie/book.json'

export default function LoadingAnimation(){

    return(
        // <p>loading </p>
        <Lottie animationData={LoadingLottie} loop={true} />
    )
}

