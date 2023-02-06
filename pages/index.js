import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [countryInput, setCountryInput] = useState("");
  const [result, setResult] = useState();

  const [questionInput, setQuestionInput] = useState("");
  const [answer, setAnswer] = useState();

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

  async function onSubmit2(event) {
      event.preventDefault();
      try {
        const response = await fetch("/api/getAnswer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: questionInput }),
        });

        const data = await response.json();
        if (response.status !== 200) {
          throw data.error || new Error(`Request failed with status ${response.status}`);
        }

        setAnswer(data.answer);
        setQuestionInput("");
      } catch(error) {
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

        <img src="/qst.png" className={styles.icon} />
        <h3>Find the answer</h3>
        <form onSubmit={onSubmit2}>
          <input
            type="text"
            name="question"
            placeholder="Enter a question"
            value={questionInput}
            onChange={(e) => setQuestionInput(e.target.value)}
          />
          <input type="submit" value="Search answer" />
        </form>
        <div className={styles.result}>{answer}</div>
      </main>
    </div>
  );
}
