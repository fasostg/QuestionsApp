import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";
import { AdminRoom } from "./pages/AdminRoom";

import { AuthContextProvider } from './contexts/AuthContext';
import { ThemeContextProvider } from "./contexts/ThemeContext";


//EXACT TEM A FUNÇÃO DE FAZER COM QUE A VIEW SÓ SEJA MOSTRADA SE O PATH FOR EXATAMENTE O QUE FOI DEFINIDO
//SWITCH NÃO DEIXA DUAS ROTAS SEREM ACESSADAS AO MESMO TEMPO
function App() {
  return (
    <BrowserRouter>
      <ThemeContextProvider>
        <AuthContextProvider>
          <Switch>   
            <Route path="/" exact={true} component={Home}/>
            <Route path="/rooms/new" exact component={NewRoom}/>
            <Route path="/rooms/:id" exact component={Room}/>
            <Route path="/admin/rooms/:id" exact component={AdminRoom}/>
          </Switch>
        </AuthContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  );
}

export default App;
