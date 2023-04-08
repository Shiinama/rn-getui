import { Space, Skeleton } from '@fruits-chain/react-native-xiaoshu'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export interface WebviewLoadingProps {}

const WebviewLoading: React.FC<WebviewLoadingProps> = () => {
  const insets = useSafeAreaInsets()

  return (
    <Space>
      <View style={[{ height: insets.top + 44 }, STYLES.header]}>
        <View style={STYLES.headerInner}>
          <Skeleton.Paragraph rows={1} widths={[100]} active />
        </View>
      </View>

      <View style={STYLES.card}>
        <Skeleton loading />
      </View>

      <View style={STYLES.card}>
        <Skeleton loading />
      </View>

      <View style={STYLES.card}>
        <Skeleton loading />
      </View>
    </Space>
  )
}

const STYLES = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  headerInner: {
    height: 44,
    width: 80,
    justifyContent: 'center',
  },

  card: {
    marginHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 12,
  },
})

export default WebviewLoading
