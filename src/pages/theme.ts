import { createTheme, ThemeProvider } from '@mui/material/styles'

export const theme = createTheme({
   typography: {
      fontFamily: 'Montserrat, sans-serif'
   },
   components: {
      MuiListItem: {
         styleOverrides: {
            root: {
               width: 'unset'
            }
         }
      },
      MuiListItemButton: {
         styleOverrides: {
            root: {
               flexGrow: 'unset'
            }
         }
      }
   }
})