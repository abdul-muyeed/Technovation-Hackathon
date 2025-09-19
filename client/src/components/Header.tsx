'use client'
import styles from '@/styles/main.module.scss';
import { Link } from 'lucide-react';

export default function Header(){
    const isLoggedIn = false;
    return (
        <header
        className={styles.header}
        >
            <div
            className={styles.flexItem1}
            >
                <button
                className={styles.navBtn}
                >
                    <svg className={styles.icon}>
                        <use href="/sprite.svg#icon-menu" />
                    </svg>
                </button>
                <h1>GarbageGuru</h1>
            </div>
            <div
            className={styles.flexItem2}
            >
                <input
                type="text"
                className={styles.inputText}
                placeholder='search...'
                />
            </div>
            <div
            className={styles.flexItem3}
            >
                <button
                className={styles.notifyBtn}
                >
                    <svg
                    className={styles.icon}
                    >
                        <use href="/sprite.svg#icon-bell" />
                    </svg>
                </button>
                <button
                className={styles.coinBtn}
                >
                    <svg
                    className={styles.icon}
                    >
                        <use href="/sprite.svg#icon-coin-dollar" />
                    </svg>0.0
                </button>

                <Link
                href='/login'
                className={styles.btn}
                >
                    <svg
                    className={styles.icon}
                    >
                        <use href="/sprite.svg#icon-enter" />
                    </svg>Login
                </Link>
            </div>
        </header>
    );
}