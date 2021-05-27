import React from "react";
import { Provider } from "react-redux";
import ReduxToastr from "react-redux-toastr";
import { QueryClient, QueryClientProvider } from "react-query";
import store from "./redux/store/index";
import Routes from "./routes/Routes";
import { UserProvider } from "./contexts/UserContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //notifyOnChangeProps: "tracked",
    },
  },
});

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Routes />
      </UserProvider>
    </QueryClientProvider>
    <ReduxToastr
      timeOut={5000}
      newestOnTop={true}
      position="top-right"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar
      closeOnToastrClick
    />
  </Provider>
);

export default App;
