import React from 'react';

const HomePageTitle = () => {
    return (
        <div>
            <div class="title" onclick={() => window.location.href='login.html'}>
                <h1>Amazondle</h1>
            </div>
            <p className="description">A daily guessing game for Amazon product prices</p>
        </div>
    );
}

export default HomePageTitle;