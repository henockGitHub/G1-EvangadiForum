import styles from './PageNotFound.module.css'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

function PageNotFound() {
    useEffect(() => {
        document.title = 'Evangadi Forum | Page Not Found'
    }, [])
    return (
        <>
            
                <section className={`${styles.mainDiv}`}>
                    <div className={styles.TextContainer}>
                        <h3>
                            Sorry, the page you are looking for couldnt be found.
                        </h3>
                        <br />
                        <div>
                            <p>Please go back to the <Link to="/">home page</Link> and try again. If it still doesnt work for you, please reach out to our team at support@evangadi.com.</p>
                        </div>
                    </div>
                </section >
            
        </>
    )
}

export default PageNotFound