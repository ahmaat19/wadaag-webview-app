import { WebView } from 'react-native-webview'

export default function WebViewComponent({
  onLoadStart,
  onLoadEnd,
  onNavigationStateChange,
  source,
  webViewRef,
}) {
  return (
    <WebView
      source={source}
      onLoadStart={onLoadStart}
      onLoadEnd={onLoadEnd}
      onNavigationStateChange={onNavigationStateChange}
      ref={webViewRef}
    />
  )
}
