import type { FC } from 'react'
import { Text, View } from 'react-native'
import EStyleSheet from '@/lib/react-native-extended-stylesheet'
import { useNavigation } from '@react-navigation/native'
import LinearGradinet from 'react-native-linear-gradient'

const docUrlMap = [
  {
    url: 'https://techblog.hjgpscm.com/',
    title: '官网',
  },
  {
    url: 'https://hjfruit.github.io/xiaoshu-doc/',
    title: '小暑',
  },
  {
    url: 'https://hjfruit.github.io/hanlu-doc/',
    title: '寒露',
  },
  {
    url: 'https://hjfruit.github.io/utils/#/',
    title: '工具库',
  },
  {
    url: 'https://hjfruit.github.io/icon-doc/',
    title: 'icon',
  },
  {
    url: 'https://hjfruit.github.io/bailu-doc/',
    title: '白露',
  },
  {
    url: 'https://hjfruit.github.io/laba-doc/',
    title: '腊八',
  },
]
export interface HomeHeaderProps {}
const Getui: FC<HomeHeaderProps> = () => {
  const navigation = useNavigation()
  return (
    // <View style={styles.headerTitle}>
    //   <Text>首页</Text>
    // </View>
    <LinearGradinet colors={['#FFD801', '#FF8040', '#F75D59']} style={styles.background}>
      <View style={styles.background}>
        {docUrlMap.map((i, k) => {
          return (
            <View style={styles.title} key={k}>
              <Text
                onPress={() =>
                  navigation.navigate('WEBVIEW_PAGE', {
                    source: {
                      uri: i.url,
                    },
                  })
                }
                style={styles.titleText}
              >
                {i.title}
              </Text>
            </View>
          )
        })}
      </View>
    </LinearGradinet>
  )
}

const styles = EStyleSheet.create({
  background: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
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
