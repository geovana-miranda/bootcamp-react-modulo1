import { Box, Button, Container, TextField } from "@material-ui/core";
import { useState } from "react";
import { startSession } from "../services/apiServices";
import { IUsers } from "../model/users";

interface ILoginScrenProps {
  onLogin: (user: IUsers) => void;
}

export function LoginScreen(props: ILoginScrenProps) {
  const { onLogin } = props;

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    startSession(email, password).then(onLogin, () =>
      setError("Senha ou email invalidos")
    );
  }
  return (
    <Container>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          fullWidth
          variant="outlined"
          label="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          variant="outlined"
          type="password"
          label="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Box textAlign="right" padding="1rem 0">
          <Button variant="contained" color="primary" type="submit">
            Entrar
          </Button>
        </Box>
        {error}
      </form>
    </Container>
  );
}
