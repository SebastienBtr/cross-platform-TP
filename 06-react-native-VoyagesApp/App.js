import React from 'react';

import MenuPrincipal from "./src/MenuPrincipal";


export default class App extends React.Component {

    state = {
        voyages: []
    }

    render() {
        return (
            <MenuPrincipal screenProps={{
                voyages: this.state.voyages,
                addVoyage: (voyage) => this.addVoyage(voyage),
                updateVoyages: () => this.update(),
            }} />
        );
    }

    addVoyage(voyage) {
        this.setState({ voyages: [...this.state.voyages, voyage] });
        console.log('Add voyage');
    }

    update() {
        this.setState((state) => ({}));
    }
}

