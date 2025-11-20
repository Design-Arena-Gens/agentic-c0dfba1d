'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [catFact, setCatFact] = useState('');
  const [catImage, setCatImage] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCatData = async () => {
    setLoading(true);
    try {
      const [factRes, imageRes] = await Promise.all([
        fetch('https://catfact.ninja/fact'),
        fetch('https://api.thecatapi.com/v1/images/search')
      ]);

      const factData = await factRes.json();
      const imageData = await imageRes.json();

      setCatFact(factData.fact);
      setCatImage(imageData[0].url);
    } catch (error) {
      console.error('Error fetching cat data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCatData();
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>🐱 Cat Facts & Pictures</h1>

        <div className={styles.card}>
          {loading ? (
            <p className={styles.loading}>Loading...</p>
          ) : (
            <>
              {catImage && (
                <div className={styles.imageContainer}>
                  <img src={catImage} alt="Random cat" className={styles.catImage} />
                </div>
              )}

              {catFact && (
                <div className={styles.factContainer}>
                  <h2>Did you know?</h2>
                  <p className={styles.fact}>{catFact}</p>
                </div>
              )}
            </>
          )}
        </div>

        <button onClick={fetchCatData} className={styles.button} disabled={loading}>
          {loading ? 'Loading...' : 'Get Another Cat! 🐾'}
        </button>
      </main>
    </div>
  );
}
