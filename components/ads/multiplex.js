'use client'
import React, { useEffect, useState, useRef } from "react";


function MultiplexAd () {

    useEffect(() => {
        if(process.env.NODE_ENV === "production"){
            var ads = document.getElementsByClassName('adsbygoogle').length;
            for (var i = 0; i < ads; i++) {
              try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
              } catch (e) {}
            }
            
        }
    }, [])
    
  return (
    <ins className="adsbygoogle"
    style={{display:"block"}}
    data-ad-format="autorelaxed"
    data-ad-client="ca-pub-4248324788374908"
    data-ad-slot="4146767215"></ins>
  )
}
export default MultiplexAd;