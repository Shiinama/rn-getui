import type { FC } from 'react'
import { Text, View } from 'react-native'

import EStyleSheet from '@/lib/react-native-extended-stylesheet'

export interface HomeHeaderProps {}
const Getui: FC<HomeHeaderProps> = () => {
  return (
    <View style={styles.headerTitle}>
      <Text>首页</Text>
    </View>
  )
}

const styles = EStyleSheet.create({
  headerTitle: {
    backgroundColor: '#0065FE',
    paddingHorizontal: 16,
  },
  title: {
    height: 44,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
})
export default Getui
