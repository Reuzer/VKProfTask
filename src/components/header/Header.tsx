import styles from './Header.module.css'
import { Link } from 'react-router-dom';

const Header = () => {

    return (
        <>
            <header className={styles.header}>
                <nav className={styles.navbar}>
                    <Link to=''>Фильмы</Link>
                    <Link to='/favourite'>Избранное</Link>
                </nav>
            </header>
        </>
    );
}
 
export default Header;