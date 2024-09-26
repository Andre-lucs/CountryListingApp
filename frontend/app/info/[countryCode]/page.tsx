import React from 'react';
import axios from 'axios';
import 'chart.js/auto';
import Image from 'next/image';
import styles from "./info.module.css";
import Link from 'next/link';
import PopulationChart from '@/components/PopulationChart';

const apiUrl = process.env.API_URL;

async function fetchCountryData(countryCode: string) {
  if (!countryCode) {
    return {} as Country;
  }
  return (await axios.get(`${apiUrl}/country-info/${countryCode}`)).data as Country;
}

const CountryInfoPage = async ({ params }: { params: { countryCode: string } }) => {
  
  const countryId  = params.countryCode;
  const country : Country = await fetchCountryData(countryId); 
  
  if (!country.commonName) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const populationChartData = {
    labels: country.populationData.map((data) => data.year),
    datasets: [
      {
        label: 'Population',
        data: country.populationData.map((data) => data.value),
        fill: false,
        borderColor: '#0070f3',
      },
    ],
  };
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{country.commonName}</h1>

      <div className={styles.flagContainer}>
        <Image className={styles.flag} width={300} height={300}  sizes="(max-width: 768px) 100vw, 33vw" src={country.flagUrl} alt={`${country.commonName} flag`} />
      </div>

      <div className={styles.section}>
        <h2>Border Countries</h2>
        <ul className={styles.borderCountriesList}>
          {country.borders.map(({countryCode, commonName}) => (
            <li key={countryCode}>
              <Link href={`/info/${countryCode}`} className={styles.link}>
                {commonName}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Population Over Time</h2>
        <PopulationChart populationChartData={populationChartData} />
      </div>
    </div>
  );
};

export default CountryInfoPage;

interface Country {
  commonName: string;
  countryCode: string;
  flagUrl: string;
  borders: Country[];
  populationData: { year: number; value: number }[];
}
