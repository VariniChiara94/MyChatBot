import CssBaseline from '@mui/material/CssBaseline';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import NotificationsProvider from './hooks/useNotifications/NotificationsProvider.tsx';
import DialogsProvider from './hooks/useDialogs/DialogsProvider.tsx';
import AppTheme from './theme/AppTheme.tsx';
import SignIn from "./pages/SignIn.tsx";
import Home from "./pages/Home.tsx";
import './App.css'
import {
    dataGridCustomizations,
    datePickersCustomizations,
    sidebarCustomizations,
    formInputCustomizations,
} from './theme/customizations';


const themeComponents = {
    ...dataGridCustomizations,
    ...datePickersCustomizations,
    ...sidebarCustomizations,
    ...formInputCustomizations,
};

export default function App(props: { disableCustomTheme?: boolean }) {

    return (
        <AppTheme {...props} themeComponents={themeComponents}>
            <CssBaseline enableColorScheme />
            <NotificationsProvider>
                <DialogsProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<SignIn />} />
                            {/* <Route path="/home" element={<Home />} />*/}
                        </Routes>
                    </BrowserRouter>
                </DialogsProvider>
            </NotificationsProvider>
        </AppTheme>
    );
}
