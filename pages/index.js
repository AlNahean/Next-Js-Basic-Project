import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <div className=" container">
          <h1 className=" text-primary w-100 text-center">
            Next Js Basic Project
          </h1>
          <ul className=" list-unstyled text-info">
            <li className=" mb-3">
              <Link href="/posts">
                <a className=" text-decoration-none h3 text-info">Post</a>
              </Link>
            </li>
            <li className=" mb-3">
              <Link href="/todos">
                <a className=" text-decoration-none h3 text-info">Todos</a>
              </Link>
            </li>
            <li className=" mb-3">
              <Link href="/create-todo">
                <a className=" text-decoration-none h3 text-info">
                  Create Todos
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
