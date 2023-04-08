import { ArrowLeftOutline } from '@fruits-chain/icons-react-native'
import React from 'react'
import type { TouchableOpacityProps } from 'react-native'
import { View, TouchableOpacity } from 'react-native'

import EStyleSheet from '@/lib/react-native-extended-stylesheet'

interface BackArrowProps extends TouchableOpacityProps {
  /**
   * 图标颜色
   */
  iconColor?: string
}

/**
 * 导航栏左上角返回按钮
 * @description 添加一个反馈高亮
 * @description TODO 修复 使用 memo 包裹后，`src/router/config.tsx` 里面报错的问题
 */
const BackArrow: React.FC<BackArrowProps> = ({
  iconColor = '#11151A',
  ...restProps
}) => {
  return (
    <TouchableOpacity {...restProps} activeOpacity={restProps.activeOpacity}>
      <View style={Styles.back}>
        <ArrowLeftOutline color={iconColor} />
      </View>
    </TouchableOpacity>
  )
}

const Styles = EStyleSheet.create({
  back: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default BackArrow
