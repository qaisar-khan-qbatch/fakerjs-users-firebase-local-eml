import React from 'react' 
import './Home.css'

import UsersList from '../../Components/UsersList/UsersList'

const Home = () => {
    return (
        <>
            <article className='article-header'>
                <header>
                    <h1> Firebase Local Emulator ft FakerJs </h1>
                </header>
            </article>
            <section>
                <UsersList />
            </section>
        </>
    )
}

export default Home