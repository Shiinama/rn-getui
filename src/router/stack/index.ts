import type { IRouteConfig } from '@/router/typing'

import type { OthersStackParamList } from './others'
import type { GetuiStackParamList } from './getui'
import Getui from './getui'

export type StackParamList = OthersStackParamList & GetuiStackParamList

export type StackName = keyof StackParamList

const stackRoutes: IRouteConfig<StackName>[] = [...Getui]

export default stackRoutes
