import { useEffect, useState, useRef } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Netinfo from '@react-native-community/netinfo'
import WebViewComponent from './components/WebView'
import { View, Text, BackHandler } from 'react-native'
import Offline from './components/Offline'

const styles = {
  container: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
}
export default function App() {
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [source, setSource] = useState({
    html: `<html><body><h1>Loading...</h1></body></html>`,
  })
  const [reload, setReload] = useState(false)

  useEffect(() => {
    Netinfo.fetch().then((state) => {
      setIsConnected(state.isConnected)
    })
  }, [reload])

  useEffect(() => {
    const unsubscribe = Netinfo.addEventListener((state) => {
      setIsConnected(state.isConnected)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  const html = `
  <div style='display:flex; justify-content:center; align-items:center; height:100%; color:red; margin-left:100; margin-right:100; font-size: 20; text-align:center;'>
  <h1>WADAAG is updating right now so you won't be able to access the app</h1>
  </div>
  `

  useEffect(() => {
    if (isConnected) {
      setIsLoading(false)
      setSource({ uri: 'https://www.wadaag.app' })
    } else {
      setIsLoading(true)
      setSource({ html: html })
    }
  }, [isConnected])

  const onLoadStart = ({ nativeEvent }) => {
    setIsLoading(nativeEvent.loading)
  }
  const onLoadEnd = ({ nativeEvent }) => {
    setIsLoading(nativeEvent.loading)
  }

  const [back, setBack] = useState(false)
  const webViewRef = useRef()

  const onNavigationStateChange = (state) => {
    setBack(state.canGoBack)
  }

  const onBackPress = () => {
    webViewRef.current.goBack()
    return true
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress)
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress)
    }
  }, [back])

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {isLoading && (
          <View style={{ marginTop: 20, alignItems: 'center' }}>
            <Text>Loading...</Text>
          </View>
        )}
        {isConnected ? (
          <WebViewComponent
            source={source}
            onLoadStart={onLoadStart}
            onLoadEnd={onLoadEnd}
            onNavigationStateChange={onNavigationStateChange}
            webViewRef={webViewRef}
          />
        ) : (
          <Offline setReload={setReload} reload={reload} />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
