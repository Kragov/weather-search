import React from "react";

import Search from "./search-field/search";
import Weather from "./weather/weather";

class App extends React.Component {
    render() {
        return (
            <>
                <Search />
                <Weather />
            </>
        );
    }
}

export default App;
