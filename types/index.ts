export interface ISubscription {
  subscription: {
    name: string,
    id: string,
    URL: string,
    status: string,
  },
}

export interface IContainer {
  children: React.ReactNode,
}

export interface ITitle {
  children: React.ReactNode,
}

export interface ISection {
  sectionTitle: string,
  sectionDescription: string,
  toggle?: boolean,
  children?: React.ReactNode,
}

export interface IListTitle {
  list: ISubscription['subscription'][],
  listUpdateHandler: React.Dispatch<React.SetStateAction<IList['list']>>,
  listTitle: string,
  canAddToList?: boolean,
}

export interface IList extends IListTitle {
  emptyListMessage?: string,
  canAcceptConnection?: boolean,
}

export interface IItem {
  item: ISubscription['subscription'],
  onDisconnect?(id: string): void, 
  onConnect?(id: string): void,
}

export interface IButton {
  item: ISubscription['subscription'],
  type: ActionType,
  onAction(id: string): void,
}

export type ActionType = "disconnect" | "connect";