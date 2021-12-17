export interface ISubscription {
  subscription: {
    storeURL: string,
    id: string,
    status: string,
  },
}

export interface ISection {
  user: string,
  sectionTitle: string,
  sectionDescription: string,
  toggle?: boolean,
  children?: React.ReactNode,
}

export interface IList {
  user: string,
  listType: "subscribeTo" | "publishTo",
  list: ISubscription['subscription'][],
  listUpdateHandler: React.Dispatch<React.SetStateAction<IList['list']>>,
  listText: {
    title: string,
    description?: string,
  },
  emptyListText: {
    title: string, 
    description?: string,
  },
  canAddToList?: boolean,
  canAcceptConnection?: boolean,
}

export interface IItem {
  item: ISubscription['subscription'],
  onDisconnect?(id: string): void, 
  onConnect?(id: string): void,
  canAcceptConnection?: boolean,
}
