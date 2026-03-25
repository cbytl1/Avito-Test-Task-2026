import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Dashboard from './pages/Dashboard';
import CardPage from './pages/CardPage';
import EditPage from './pages/EditPage';

const theme = createTheme({
  palette: {
    mode: 'light',
  }
})

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <BrowserRouter>
        <Routes>
          <Route path='/ads' element={<Dashboard />} />
          <Route path='/ads/:id' element={<CardPage />} />
          <Route path='/ads/:id/edit' element={<EditPage />} />
          <Route path="*" element={<Navigate to="/ads" replace />} />
        </Routes>
        </BrowserRouter>
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App
