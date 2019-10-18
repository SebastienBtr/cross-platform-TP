import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import Entete from './src/Entete'
import Saisie from './src/Saisie'
import BoutonCreer from './src/BoutonCreer'
import ListeActions from './src/action/ListeActions'
import Menu from './src/menu/Menu'

/**
 * Composant d'entrée de l'application.
 */
export default class App extends React.Component {

    // état global de l'application
    // il y aura probalement d'autres informations à stocker
    state = {
        texteSaisie: '',
        actions: [
        ],
        option: 'all'
    }

    /**
     * Méthode invoquée lorsque que la saisie change.
     *
     * @param nouvelleSaisie la valeur saisie
     */
    quandLaSaisieChange(nouvelleSaisie) {
        this.setState({ texteSaisie: nouvelleSaisie })
        console.log('la saisie à changée', nouvelleSaisie)
    }

    /**
     * Méthode invoquée lors du clic sur le bouton `Valider`.
     */
    validerNouvelleAction() {
        this.setState({ texteSaisie: '', actions: [...this.state.actions, { title: this.state.texteSaisie, done: false }] });
        console.log('Vous avez cliqué sur Valider !')
    }

    /**
     * When we click on the remove button of an action
     */
    removeAction(index) {
        this.setState((state) => ({
            actions: state.actions.filter((action, i) => i !== index)
        }));
        console.log('remove action');
    }

    /**
     * Change the done state of an action
     * @param {*} action the action to edit
     */
    togleDone(action) {
        action.done = !action.done;
        this.setState((state) => ({}));
        console.log('change done')
    }

    /**
     * Setter for the option state
     * @param {*} option the new option
     */
    setOption(option) {
        this.setState((state) => ({
            option: option
        }));
    }

    render() {
        let { texteSaisie, actions } = this.state

        if (this.state.option == 'actives') {
            actions = actions.filter((action) => action.done == false);
        }
        if (this.state.option == 'done') {
            actions = actions.filter((action) => action.done == true);
        }

        return (
            <View style={styles.conteneur}>
                <ScrollView keyboardShouldPersistTaps='always' style={styles.content}>
                    <Entete />
                    <Saisie texteSaisie={texteSaisie} evtTexteModifie={(titre) => this.quandLaSaisieChange(titre)} />
                    <ListeActions
                        actions={actions}
                        removeFunction={(index) => this.removeAction(index)}
                        doneFunction={(action) => this.togleDone(action)}
                    />
                    <BoutonCreer onValider={() => this.validerNouvelleAction()} />
                </ScrollView>
                <Menu setOption={(option) => this.setOption(option)} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    conteneur: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        paddingTop: 60,
    },
})