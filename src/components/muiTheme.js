import { createMuiTheme } from 'material-ui/styles';

// Color variables
const primary1Color = '#F44336';
const primary2Color = '#D32F2F';
const accent1Color = '#607D8B';
const accent2Color = '#757575';
const textAndIconsColor = '#fff';

const themeOptions = {
  palette: {
    primary1Color,
    primary2Color,
    accent1Color,
    accent2Color
  },
  overrides: {
    MuiAppBar: {
      colorDefault: {
        backgroundColor: primary1Color,
        color: textAndIconsColor
      },
      colorPrimary: {
        backgroundColor: primary1Color,
        color: textAndIconsColor
      },
      colorAccent: {
        backgroundColor: accent1Color,
        color: accent2Color
      }
    }
  }
};

const theme = createMuiTheme(themeOptions);

export default theme;