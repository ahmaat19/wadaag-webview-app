import { View, Text, Button } from 'react-native'

export default function Offline({ setReload, reload }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontWeight: 'bold', fontSize: 26, marginBottom: 10 }}>
        Oops!
      </Text>
      <Text style={{ fontSize: 14 }}>Slow or no internet connection.</Text>
      <Text style={{ fontSize: 14 }}>
        Please check your internet settings and try again.
      </Text>

      <View style={{ marginTop: 30 }}>
        <Button
          color='#4E1658'
          title='Try Again'
          onPress={() => setReload(!reload)}
        />
      </View>
    </View>
  )
}
