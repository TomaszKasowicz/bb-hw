export interface Transaction {
  amount: number;
  categoryCode: string;
  merchant: string;
  merchantLogo?: string;
  transactionDate: number;
  transactionType: 'Card Payment' | 'Online Transfer' | 'Transaction';
}

const merchants = [
  'The Tea Lounge',
  'Texaco',
  'Amazon Online Store',
  '7-Eleven',
  'H&M Online Store',
  'Jerry Hildreth',
  'Lawrence Pearson',
  'Whole Foods',
  'Southern Electric Company'
];
