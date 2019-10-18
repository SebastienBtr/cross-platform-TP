import React from 'react'
import { View, Text } from 'react-native'
import UneAction from './UneAction'


const ListeActions = ({ actions, removeFunction, doneFunction }) => {

    return (
        <View>
            {
                actions.map((action, i) => {
                    return <UneAction
                        key={i}
                        action={action}
                        removeFunction={() => removeFunction(i)}
                        doneFunction={() => doneFunction(action)}
                    />
                })
            }
        </View>
    )
}

export default ListeActions