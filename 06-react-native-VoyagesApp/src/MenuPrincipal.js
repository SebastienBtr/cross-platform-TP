import React from 'react'
import { Text, View } from 'react-native'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import ListerVoyages from './ListerVoyages'
import AjouterVoyage from './AjouterVoyage'
import UnVoyage from './UnVoyage'
import { couleurs } from './Theme'

const options = {
    navigationOptions: {
        headerStyle: {
            backgroundColor: couleurs.primaire
        },
        headerTintColor: '#fff'
    }
}

const VoyagesNav = createStackNavigator({
    ListerVoyages: { screen: ListerVoyages },
    UnVoyage: { screen: UnVoyage }
}, options)

const MenuPrincipal = createBottomTabNavigator({
    ListerVoyages: { screen: VoyagesNav },
    AjouterVoyage: { screen: AjouterVoyage }
})

export default MenuPrincipal