import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className={styles.Header}>
            <nav className={styles.navbar}>
                <Link to={'/'} className={styles.link}>Таблица продуктов</Link>
                <Link to={'/post'} className={styles.link}>Добавить продукт</Link>
            </nav>
        </header>
    );
}
 
export default Header;