import React from 'react'
import { View, StyleSheet } from 'react-native'
import OptionMenu from './OptionMenu'

/**
 * Composant Menu.
 */
const Menu = ({setOption}) => (
    <View style={styles.menu}>
        <OptionMenu title="Toutes" onPress={() => setOption('all')}/>
        <OptionMenu title="Actives" onPress={() => setOption('actives')}/>
        <OptionMenu  title="Terminées" onPress={() => setOption('done')}/>
    </View>
)

const styles = StyleSheet.create({
    menu: {
        height: 70,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#dddddd'
    }
})
export default Menu