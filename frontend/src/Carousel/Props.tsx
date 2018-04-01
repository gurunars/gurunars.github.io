export default interface Props<T extends {}> {
  items: T[];
  selectedPostion: number;
  children: any;
  close: () => void;
  goTo: (targetPosition: number) => void;
}