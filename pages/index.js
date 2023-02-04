import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [countryInput, setCountryInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ country: countryInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setCountryInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quick Testing</title>
        <link rel="icon" href="/icon.png" />
      </Head>

      <main className={styles.main}>
        <img src="/icon.png" className={styles.icon} />
        <h3>Find a place to visit</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="country"
            placeholder="Enter a country"
            value={countryInput}
            onChange={(e) => setCountryInput(e.target.value)}
          />
          <input type="submit" value="Search places" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
