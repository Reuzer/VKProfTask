import type { FC } from "react";
import styles from './modal.module.css';

interface Props {
    isOpen: boolean;
    children: React.ReactNode;
}
 
const Modal: FC<Props> = ({isOpen, children}) => {

    const rootClasses = [styles.wrapper];

    if(isOpen) {
        rootClasses.push(styles.active)
    }

    return (
        <div className={rootClasses.join(' ')}>
            <div className={styles.content__wrapper}>
                {children}
            </div>
        </div>
    );
}
 
export default Modal;