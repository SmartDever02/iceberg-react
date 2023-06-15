interface UserInfo {
  username: string;
}

interface NFT {
  _id: string;
  name: string;
  image: string;
  value: number;
  info: string;
  customized?: NFT;
}

interface IChartData {
  name: string;
  data: number;
  'user data': number;
}
