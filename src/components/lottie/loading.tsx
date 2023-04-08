import type { AnimatedLottieViewProps } from 'lottie-react-native'
import LottieView from 'lottie-react-native'
import React, { memo } from 'react'

import json from './json/loading.json'

export const genLottieLoadingColorFilters = (color: string) => [
  {
    keypath: '图标',
    color: color,
  },
]

export interface LottieLoadingProps
  extends Omit<AnimatedLottieViewProps, 'source' | 'autoPlay'> {}

const LottieLoading: React.FC<LottieLoadingProps> = props => {
  return <LottieView {...props} source={json} autoPlay />
}

export default memo(LottieLoading)
