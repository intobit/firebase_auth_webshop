import {Navigate, Route, Routes} from 'react-router-dom';
import { AuthProvider } from "./firebase/AuthProvider";
import SignIn from './pages/SignIn';
import PrivateRoute from './pages/PrivateRoute';
import Home from './pages/Home';
import PreviousOrders from "./pages/PreviousOrders";

function App() {
    return (
        <>
            <AuthProvider>
                    <Routes>
                        <Route path="/signin" element={<SignIn />} />
                        <Route exact path="/home" element={<PrivateRoute/>}>
                            <Route exact path="/home"  element={<Home/>}/>
                        </Route>
                        <Route exact path="/previousorders" element={<PrivateRoute/>}>
                            <Route exact path="/previousorders" element={<PreviousOrders />} />
                        </Route>
                        <Route path="*" element={<Navigate to="/signin" />} />
                    </Routes>
            </AuthProvider>
        </>
    );
}

export default App;
