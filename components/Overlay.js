'use client';

export default function OverlayMobileMenu(){
    return(
        <div className="mobile-menu-overlay" onClick={ () => {document.querySelector( 'body' ).classList.remove( 'mmenu-active' )} }></div>

    )
}