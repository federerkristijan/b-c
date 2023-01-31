import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home({data}) {
  const recipes = data.recipes;

  return (
    <>
      <Head>
        <title>Burner Cookbook</title>
        <meta name="description" content="Burner cookbook" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <div>
            <a
              href="/about"
            >{recipes[0].title}
            </a>
          </div>
        </div>
      </main>
    </>
  )
}

export function getStaticProps() {
  return {
    props: {
      data: {
        recipes: [{ title: "Vegan Curry"}]
      }
    }
  }
}
