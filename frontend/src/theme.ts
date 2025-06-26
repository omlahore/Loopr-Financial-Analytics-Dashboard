import { createTheme } from '@mui/material/styles';
import tokens from './design-tokens.json';

const theme = createTheme({
  palette: {
    primary: { main: tokens.color.main["100"].value },
    secondary: { main: tokens.color.sec["100"].value },
    background: {
      default: tokens.color.bg.main.value,
      paper: tokens.color.bg.sec.value
    },
    text: {
      primary: tokens.color.text["100"].value,
      secondary: tokens.color.text["80"].value
    }
  },
  typography: {
    // Fallback font family, as tokens.font is not defined in your tokens file
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: { fontSize: '2rem', fontWeight: 700 },
    body1: { fontSize: '1rem' }
  },
  shape: { borderRadius: 8 }, // fallback value
  spacing: 8, // fallback value
  shadows: [
    'none',
    '0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)',
    'none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none','none'
  ] // fallback value
});

export default theme;
