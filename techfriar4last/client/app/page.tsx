import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return <main className={styles.main}>
    <h1>Welcome</h1>
    <Link className={styles.link} href={'/register'}> Click here to register</Link>
  </main>;
}
