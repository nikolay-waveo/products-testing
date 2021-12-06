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