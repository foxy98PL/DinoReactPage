export interface DinoTableModel {
  walletAddress: string;
  totalEther: string;
  totalBuys: string;
  buyData: buyDataModel[];
}

export interface buyDataModel {
  ether: string;
  transactionhash: string;
}
