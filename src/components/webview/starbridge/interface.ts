// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SafeAny = any

export interface OnMessageEvent {
  event: string
  data: string | number | object
  callbackId?: string
}

export abstract class StarbridgeModule {
  public name: string
  public apply: (e: OnMessageEvent) => void
}
