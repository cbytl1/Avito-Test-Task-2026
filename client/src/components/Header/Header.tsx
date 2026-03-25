import React from "react";
import styles from './Header.module.css';

type HeaderProps = {
    isLoading: boolean;
    total: number;
}

const Header: React.FC<HeaderProps> = (props) => {
    return (
        <div className={styles.header}>
            <h1 className={styles.title}>Мои объявления</h1>
            {!props.isLoading && <span className={styles.total}>{props.total} объявления</span>}
        </div>
    );
}

export default Header;