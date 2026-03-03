import { fetchConfig } from '@/lib/api';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import HomeCardList from '@/components/HomeCardList/HomeCardList';
import styles from './page.module.scss';

export default async function HomePage() {
  const { homepage, questionnaires } = await fetchConfig();

  return (
    <>
      <Header />
      <main className={styles.page}>
        <h1
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: homepage.title }}
        />
        <p className={styles.description}>{homepage.description}</p>

        <div className={styles.cards}>
          <HomeCardList
            questionnaires={questionnaires}
            cardLinkClass={styles.cardLink}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
