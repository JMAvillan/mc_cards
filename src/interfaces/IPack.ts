export default interface IPack {
  name: string;
  code: string;
  position: number;
  available: Date | string | number;
  known: number;
  total: number;
  url: string;
  id: number;
}
