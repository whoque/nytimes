import Head from 'next/head'
import Content from '../containers/content/content'
import Footer from '../containers/footer/footer'
import Header from '../containers/header/header'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>NyTimes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Content />
      <Footer />
    </div>
  )
}
