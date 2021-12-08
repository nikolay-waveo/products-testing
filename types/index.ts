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
  children?: React.ReactNode,
}