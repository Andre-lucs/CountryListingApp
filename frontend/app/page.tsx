import axios from "axios";
import styles from "./page.module.css";
import Link from "next/link";

const apiUrl = process.env.API_URL;

async function fetchCountries() {
  return axios.get(`${apiUrl}/available-countries`);
}

export default async function CountryListing() {

  const res = await fetchCountries();
  const countries = res.data.countries as Country[];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Countries</h1>
        <div className={styles.grid}>
        {countries.map((country) => ( 
          <Link href={`/info/${country.countryCode}`}  key={country.countryCode} className={styles.card}>
            <b>{country.name}</b> 
          </Link>
          ))}

        </div>
      </main>
    </div>
  );
}

interface Country{
  name: string;
  countryCode: string;
}