import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Main } from "./pages/Main";
import { IUsers } from "./model/users";
import { useState } from "react";
import { LoginScreen } from "./pages/LoginScreen";
import { Box, Button } from "@material-ui/core";
import { finishSession } from "./services/apiServices";

function App() {
  const [user, setUser] = useState<IUsers | null>(null);

  if (user) {
    return (
      <BrowserRouter>
        <Box padding="1rem" display="flex">
          <Box flex="1"></Box>
          <Box>
            Olá {user.nome}{" "}
            <Button type="button" variant="outlined" onClick={() => finishSession().then(() => setUser(null))}>Sair</Button>
          </Box>
        </Box>
        <Switch>
          <Route path="/" component={Main} />
          {/* <Route path="/" render={() => <Redirect to="/despesas/2021-01"} /> */}
        </Switch>
      </BrowserRouter>
    );
  } else {
    return <LoginScreen onLogin={(user) => setUser(user)} />;
  }
}

export default App;
