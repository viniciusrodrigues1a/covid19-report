import React, { useState, useEffect, useMemo } from 'react';
import { FaHeart, FaArrowDown } from 'react-icons/fa';
import CountUp from 'react-countup';

import languages from '../../languages';

import { apiCovid, apiIpInfo } from '../../services/api';

import {
  Container,
  Content,
  Header,
  SelectLanguage,
  SelectLanguageArrow,
  Title,
  SelectCountryContainer,
  SelectLanguageContainer,
  SelectCountry,
  SelectCountryArrow,
  ChartIcon,
  MainContainer,
  ChartContainer,
  Chart,
  Cases,
  Footer,
  FooterInfo,
  FooterInfoLink,
} from './styles';

export default function Main({ history }) {
  const [country, setCountry] = useState('Worldwide');
  const [apiData, setApiData] = useState({});
  const [dataset, setDataset] = useState({});
  const [cases, setCases] = useState({
    confirmed: 0,
    recovered: 0,
    deaths: 0,
  });
  const [clientLanguage, setClientLanguage] = useState(languages.US);

  useEffect(() => {
    (() => {
      async function loadApiData() {
        const response = await apiCovid.get();
        setApiData(response.data);
      }

      async function getClientLanguage() {
        const { data } = await apiIpInfo.get();
        const storedLanguage = localStorage.getItem('language');

        if (storedLanguage) {
          if (storedLanguage in languages) {
            setClientLanguage(languages[storedLanguage]);
          }
        } else if (data.countryCode in languages) {
          localStorage.setItem('language', data.countryCode);

          setClientLanguage(languages[data.countryCode]);
        }
      }

      loadApiData();
      getClientLanguage();
    })();
  }, []);

  useEffect(() => {
    const { pathname } = window.location;
    const countryName = pathname.substring(1, pathname.length);
    if (Object.keys(apiData).indexOf(countryName) >= 0) {
      setCountry(countryName);
    }
  }, [apiData]);

  useEffect(() => {
    function getRecoveredPeople(dates) {
      const datesWithRecoveredPeople = dates.filter(c => c.recovered);

      const lastDateWithRecoveredPeople =
        datesWithRecoveredPeople[datesWithRecoveredPeople.length - 1];

      return lastDateWithRecoveredPeople;
    }

    function getWorldwideInfo() {
      const totalCases = {
        confirmed: 0,
        recovered: 0,
        deaths: 0,
      };

      const worldwideDatasetData = {};

      Object.keys(apiData).forEach(key => {
        // getting total cases
        const countryDates = apiData[key];
        const lastDateAvailable = countryDates[countryDates.length - 1];

        const lastDateWithRecoveredPeople = getRecoveredPeople(countryDates);

        if (lastDateWithRecoveredPeople) {
          totalCases.recovered += lastDateWithRecoveredPeople.recovered;
        }
        totalCases.confirmed += lastDateAvailable.confirmed;
        totalCases.deaths += lastDateAvailable.deaths;

        // getting data for the dataset
        countryDates.forEach(c => {
          if (!worldwideDatasetData.hasOwnProperty(c.date)) {
            worldwideDatasetData[c.date] = {
              confirmed: 0,
              recovered: 0,
              deaths: 0,
            };
          }

          worldwideDatasetData[c.date].confirmed += c.confirmed;
          worldwideDatasetData[c.date].recovered += c.recovered
            ? c.recovered
            : 0;
          worldwideDatasetData[c.date].deaths += c.deaths;
        });
      });

      const worldwideDatasetCasesArrayObject = {
        confirmed: [],
        recovered: [],
        deaths: [],
      };

      Object.keys(worldwideDatasetData).forEach(key => {
        const casesObj = worldwideDatasetData[key];
        worldwideDatasetCasesArrayObject.confirmed.push(casesObj.confirmed);
        worldwideDatasetCasesArrayObject.recovered.push(casesObj.recovered);
        worldwideDatasetCasesArrayObject.deaths.push(casesObj.deaths);
      });

      const worldwideDataset = {
        labels: [...Object.keys(worldwideDatasetData)],
        datasets: [
          {
            label: clientLanguage.chart.confirmed,
            data: [...worldwideDatasetCasesArrayObject.confirmed],
            borderColor: '#fff',
          },
          {
            label: clientLanguage.chart.recovered,
            data: [...worldwideDatasetCasesArrayObject.recovered],
            borderColor: '#0bed84',
          },
          {
            label: clientLanguage.chart.deaths,
            data: [...worldwideDatasetCasesArrayObject.deaths],
            borderColor: '#ed290b',
          },
        ],
      };

      setDataset(worldwideDataset);
      setCases(totalCases);
    }

    function getCountryInfo() {
      const countryDates = apiData[country];
      const lastDateAvailable = countryDates[countryDates.length - 1];
      const totalCases = {
        confirmed: 0,
        recovered: 0,
        deaths: 0,
      };

      const lastDateWithRecoveredPeople = getRecoveredPeople(countryDates);

      if (lastDateWithRecoveredPeople) {
        totalCases.recovered += lastDateWithRecoveredPeople.recovered;
      }
      totalCases.confirmed += lastDateAvailable.confirmed;
      totalCases.deaths += lastDateAvailable.deaths;

      setCases(totalCases);
    }

    function generateDatasetOfACountry() {
      const countryDates = apiData[country];
      const dates = countryDates.map(c => c.date);
      const confirmedCases = countryDates.map(c => c.confirmed);
      const recoveredCases = countryDates.map(c => c.recovered);
      const deathCases = countryDates.map(c => c.deaths);

      const newDataset = {
        labels: [...dates],
        datasets: [
          {
            label: clientLanguage.chart.confirmed,
            data: [...confirmedCases],
            borderColor: '#fff',
          },
          {
            label: clientLanguage.chart.recovered,
            data: [...recoveredCases],
            borderColor: '#0bed84',
          },
          {
            label: clientLanguage.chart.deaths,
            data: [...deathCases],
            borderColor: '#ed290b',
          },
        ],
      };

      setDataset(newDataset);
    }

    if (country === 'Worldwide') {
      getWorldwideInfo();
    } else {
      getCountryInfo();
      generateDatasetOfACountry();
    }
  }, [country, apiData, clientLanguage]);

  function handleChangeSelectCountry(e) {
    history.push(encodeURI(e.target.value));
    setCountry(decodeURI(e.target.value));
  }

  function handleChangeSelectLanguage(e) {
    const key = e.target.value;
    if (key in languages) {
      localStorage.setItem('language', key);

      setClientLanguage(languages[key]);
    }
  }

  const selectLanguageDefaultValue = useMemo(() => clientLanguage.countryCode, [
    clientLanguage,
  ]);

  return (
    <Container>
      <Content>
        <Header>
          <SelectLanguageContainer>
            <SelectLanguage
              onChange={handleChangeSelectLanguage}
              value={selectLanguageDefaultValue}
            >
              {Object.keys(languages).map(key => (
                <option key={key} value={key}>
                  {languages[key].languageName}
                </option>
              ))}
            </SelectLanguage>
            <SelectLanguageArrow>
              <FaArrowDown color="#fff" size={14} />
            </SelectLanguageArrow>
          </SelectLanguageContainer>
          <div>
            <Title>
              {clientLanguage.header.title}
              <ChartIcon />
            </Title>
            <SelectCountryContainer>
              <SelectCountry
                value={country}
                onChange={handleChangeSelectCountry}
              >
                <option value="Worldwide">Worldwide</option>
                <option disabled>-</option>
                {Object.keys(apiData).map(key => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </SelectCountry>
              <SelectCountryArrow>
                <FaArrowDown color="#fff" />
              </SelectCountryArrow>
            </SelectCountryContainer>
          </div>
        </Header>
        <MainContainer>
          <ChartContainer>
            <Chart data={dataset} responsive />
          </ChartContainer>
          <Cases>
            <p>
              {clientLanguage.main.confirmed}:{' '}
              <CountUp
                end={cases.confirmed}
                duration={1}
                separator={clientLanguage.main.decimalSeparator}
              />
            </p>
            <p>
              {clientLanguage.main.recovered}:{' '}
              <CountUp
                end={cases.recovered}
                duration={1}
                separator={clientLanguage.main.decimalSeparator}
              />
            </p>
            <p>
              {clientLanguage.main.deaths}:{' '}
              <CountUp
                end={cases.deaths}
                duration={1}
                separator={clientLanguage.main.decimalSeparator}
              />
            </p>
          </Cases>
        </MainContainer>
      </Content>
      <Footer>
        <FooterInfo>
          {clientLanguage.footer.madeBy[0]} <FaHeart color="#fff" size={12.8} />{' '}
          {clientLanguage.footer.madeBy[1]}{' '}
          <FooterInfoLink
            href="https://github.com/viniciusrodrigues1a/"
            target="_blank"
          >
            Vinícius Rodrigues
          </FooterInfoLink>
        </FooterInfo>
        <FooterInfo>
          {clientLanguage.footer.dataProvidedBy}{' '}
          <FooterInfoLink
            href="https://github.com/pomber/covid19"
            target="_blank"
          >
            pomber/covid19
          </FooterInfoLink>
        </FooterInfo>
      </Footer>
    </Container>
  );
}
