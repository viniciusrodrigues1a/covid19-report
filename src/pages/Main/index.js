import React, { useState, useEffect } from 'react';

import { FaHeart, FaArrowDown } from 'react-icons/fa';

import api from '../../services/api';
import history from '../../services/history';

import {
  Container,
  Content,
  Header,
  Title,
  SelectContainer,
  Select,
  SelectArrow,
  ChartIcon,
  MainContainer,
  ChartContainer,
  Chart,
  Cases,
  Footer,
  FooterInfo,
  FooterInfoLink,
} from './styles';

export default function Main() {
  const [country, setCountry] = useState('Worldwide');
  const [apiData, setApiData] = useState({});
  const [dataset, setDataset] = useState({});
  const [cases, setCases] = useState({});

  useEffect(() => {
    (() => {
      async function loadApiData() {
        const response = await api.get();
        setApiData(response.data);
      }

      loadApiData();
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
            label: 'Confirmed cases',
            data: [...worldwideDatasetCasesArrayObject.confirmed],
            borderColor: '#fff',
          },
          {
            label: 'Recovered cases',
            data: [...worldwideDatasetCasesArrayObject.recovered],
            borderColor: '#0bed84',
          },
          {
            label: 'Death cases',
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
            label: 'Confirmed cases',
            data: [...confirmedCases],
            borderColor: '#fff',
          },
          {
            label: 'Recovered cases',
            data: [...recoveredCases],
            borderColor: '#0bed84',
          },
          {
            label: 'Death cases',
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
  }, [country, apiData]);

  function handleChangeSelect(e) {
    history.push(encodeURI(e.target.value));
    setCountry(decodeURI(e.target.value));
  }

  return (
    <Container>
      <Content>
        <Header>
          <div>
            <Title>
              COVID-19 Report
              <ChartIcon />
            </Title>
            <SelectContainer>
              <Select value={country} onChange={handleChangeSelect}>
                <option>Worldwide</option>
                <option disabled>-</option>
                {Object.keys(apiData).map(key => (
                  <option key={key}>{key}</option>
                ))}
              </Select>
              <SelectArrow>
                <FaArrowDown color="#fff" />
              </SelectArrow>
            </SelectContainer>
          </div>
        </Header>
        <MainContainer>
          <ChartContainer>
            <Chart data={dataset} responsive />
          </ChartContainer>
          <Cases>
            <p>
              Total confirmed: <span>{cases.confirmed}</span>
            </p>
            <p>
              Total recovered: <span>{cases.recovered}</span>
            </p>
            <p>
              Total deaths: <span>{cases.deaths}</span>
            </p>
          </Cases>
        </MainContainer>
      </Content>
      <Footer>
        <FooterInfo>
          Made with <FaHeart color="#fff" size={12.8} /> by{' '}
          <FooterInfoLink
            href="https://github.com/viniciusrodrigues1a/"
            target="_blank"
          >
            Vinícius Rodrigues
          </FooterInfoLink>
        </FooterInfo>
        <FooterInfo>
          Data provided by{' '}
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
