import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import IconButton from "@material-ui/core/IconButton";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function HoverText() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ mt: 10 }}>
        <Tooltip title="コピー">
          <IconButton edge="end">
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>
      </Container>
    </ThemeProvider>
  );
}
