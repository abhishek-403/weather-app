import React from 'react'

function NotFound() {

    return (
        <div className='center'
            style={
                {
                    position: "fixed",
                    left: "0px",
                    padding: "auto 50vw",
                    height:"100vh",
                    width: "100vw",

                }
            }>
            <h1 style={
                {
                    
                    fontFamily:"var(--h1-font)",
                    fontSize:"var(--h1-font-size)"

                }
            } >City Not Found</h1>

        </div>
    )
}

export default NotFound

