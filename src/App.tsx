import * as React from "react";
import { ChakraProvider} from "@chakra-ui/react";
import {AuthProvider} from "./authentication/context/AuthProvider"
import {AppRouter} from "./routing/AppRouter";
import { theme } from "./Theme";

export const App: React.FC = () => {
  return(
      <ChakraProvider theme={theme}>
        <AuthProvider>
            <AppRouter/>
         </AuthProvider>
      </ChakraProvider>);

};

export default App;
