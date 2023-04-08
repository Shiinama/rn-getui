export const parseEvent = (eventName: string) => {
  const ens = eventName.split('/')

  return {
    module: ens[0],
    event: ens[1],
  }
}
