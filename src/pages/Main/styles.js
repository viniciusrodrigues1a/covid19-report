import styled from 'styled-components';
import { FaChartLine } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { darken, lighten } from 'polished';

export const Container = styled.div`
  background: #272c47;
  height: 100%;
  padding: 0.875rem 0 0;
`;

export const Content = styled.div`
  max-width: 1200rem;
  height: 100%;
  margin: auto;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const ChartIcon = styled(FaChartLine)`
  margin-left: 1.125rem;
`;

export const Title = styled.h1`
  color: #fff;
  font-size: 3em;
  padding-top: 0.8em 0 0;
  font-weight: normal;
  display: flex;
  align-items: center;
  text-align: center;

  @media (max-width: 31.25rem) {
    font-size: 1.9em;
    flex-direction: column;
  }
`;

export const SelectLanguageContainer = styled.div`
  width: 100%;
  margin: 1.5rem 0 0;
`;

export const SelectCountryContainer = styled.div`
  width: 100%;
  position: relative;
  margin: 1.5rem 0 0;
`;

export const SelectLanguage = styled.select`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  background: #272c47;
  border: 1px solid #fff;
  border-radius: 4px;
  color: #fff;
  width: 3.5em;
  position: absolute;
  top: 0%;
  right: 2%;

  &::-ms-expand {
    display: none;
  }
`;

export const SelectArrowLanguage = styled.div`
  position: absolute;
  top: 0%;
  right: 2%;
  margin: 0.2em 0.2em 0 0;
  pointer-events: none;
`;

export const SelectCountry = styled.select`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  width: 60%;
  padding: 0.75rem;
  background: #272c47;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 6px;

  &::-ms-expand {
    display: none;
  }
`;

export const SelectArrowCountry = styled.div`
  position: absolute;
  top: 12px;
  right: 25%;
  pointer-events: none;
`;

export const MainContainer = styled.main`
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-around;
  align-items: center;
`;

export const ChartContainer = styled.div`
  width: 80%;
  max-width: 1200rem;
  height: 400px;

  @media (max-width: 75em) {
    width: 90%;
  }
`;

export const Chart = styled(Line).attrs({
  options: {
    responsive: true,
    maintainAspectRatio: false,
    legend: { position: 'bottom' },
    animation: {
      duration: 800,
      easing: 'easeOutCirc',
    },
  },
})``;

export const Cases = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;

  p {
    font-size: 1.7em;
    font-weight: bold;
    font-family: 'Ropa Sans', sans-serif;
    margin: 3.25rem 0;

    &:nth-child(1) {
      color: #fff;
    }

    &:nth-child(2) {
      color: #0bed84;
    }

    &:nth-child(3) {
      color: #ed290b;
    }

    @media (max-width: 25rem) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  @media (max-width: 75rem) {
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
      margin: 0.8rem 0;

      &:nth-child(1) {
        margin-top: 2.25rem;
      }

      &:nth-child(3) {
        margin-bottom: 2.25rem;
      }
    }
  }
`;

export const Footer = styled.footer`
  width: 100%;
  background: ${darken(0.04, '#272c47')};
  padding: 1.5rem;
  margin-top: 3rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const FooterInfo = styled.span`
  color: #fff;
  font-size: 0.8em;
  font-weight: bold;
  margin: 1rem;
`;

export const FooterInfoLink = styled.a`
  color: #0b75ed;
  text-decoration: none;

  &:hover,
  &:focus {
    color: ${lighten(0.1, '#0b75ed')};
  }
`;
