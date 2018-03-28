export type CoreProps = {
  menuIsVisible: boolean,
  menuIsVisibleOnChange: (state: boolean) => void,
  menu: React.ReactElement<any>,
  content: React.ReactElement<any>,
  menuWidth?: number,
  openMenuIcon?: React.ReactElement<any>,
  closeMenuIcon?: React.ReactElement<any>
};