import React from 'react';

function About(){
    return (
        // React Fragment: a ghost element! doesn't show up but you need it for jsx
        <React.Fragment>
            <h1>About</h1>
            <p>Need some quick cash? Want to sell your car? Well this is the right place for you!
                List your car here and it will be sold in no time!</p>
        </React.Fragment>
    )
}

export default About;