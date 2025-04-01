
export const mockUserData = {
  name: "Osomhe Dave",
  email: "osomhe.dave@example.com",
  avatar: "https://ui-avatars.com/api/?name=Osomhe+Doe&background=0D8ABC&color=fff"
};

export const mockAccountData = {
  balance: 24580.52,
  savingsBalance: 8750.32,
  investmentBalance: 15830.20,
  currency: "USD",
  lastUpdate: "2023-12-01T09:30:00Z"
};

export const mockTransactions = [
  {
    id: "txn-001",
    type: "deposit",
    amount: 2500.00,
    date: "2023-11-28T14:22:00Z",
    description: "Salary Deposit",
    category: "Income"
  },
  {
    id: "txn-002",
    type: "withdrawal",
    amount: 150.75,
    date: "2023-11-27T08:13:00Z",
    description: "Supermarket",
    category: "Groceries"
  },
  {
    id: "txn-003",
    type: "transfer",
    amount: 1000.00,
    date: "2023-11-25T19:45:00Z",
    description: "Transfer to Savings",
    category: "Savings"
  },
  {
    id: "txn-004",
    type: "payment",
    amount: 85.20,
    date: "2023-11-24T12:30:00Z",
    description: "Electric Bill",
    category: "Utilities"
  },
  {
    id: "txn-005",
    type: "investment",
    amount: 500.00,
    date: "2023-11-23T15:15:00Z",
    description: "Index Fund Purchase",
    category: "Investment"
  },
  {
    id: "txn-006",
    type: "withdrawal",
    amount: 63.50,
    date: "2023-11-22T20:10:00Z",
    description: "Restaurant",
    category: "Dining"
  }
];

export const mockInvestments = [
  {
    id: "inv-001",
    name: "S&P 500 ETF",
    symbol: "SPY",
    value: 5250.80,
    units: 10.5,
    pricePerUnit: 500.08,
    change: 2.3,
    allocation: 33.17
  },
  {
    id: "inv-002",
    name: "Tech Giants Fund",
    symbol: "TECH",
    value: 4320.50,
    units: 15.25,
    pricePerUnit: 283.31,
    change: -0.8,
    allocation: 27.29
  },
  {
    id: "inv-003",
    name: "Renewable Energy",
    symbol: "RNWL",
    value: 2210.30,
    units: 45.2,
    pricePerUnit: 48.90,
    change: 5.4,
    allocation: 13.96
  },
  {
    id: "inv-004",
    name: "Global Bonds",
    symbol: "BOND",
    value: 3048.60,
    units: 30,
    pricePerUnit: 101.62,
    change: 0.2,
    allocation: 19.26
  },
  {
    id: "inv-005",
    name: "Real Estate Trust",
    symbol: "REIT",
    value: 1000.00,
    units: 20,
    pricePerUnit: 50.00,
    change: -1.5,
    allocation: 6.32
  }
];

export const mockSavingsGoals = [
  {
    id: "goal-001",
    name: "Emergency Fund",
    currentAmount: 5000,
    targetAmount: 10000,
    completionDate: "2024-06-30T00:00:00Z",
    iconName: "Shield"
  },
  {
    id: "goal-002",
    name: "Dream Vacation",
    currentAmount: 2500,
    targetAmount: 5000,
    completionDate: "2024-09-15T00:00:00Z",
    iconName: "Plane"
  },
  {
    id: "goal-003",
    name: "New Car",
    currentAmount: 1250,
    targetAmount: 20000,
    completionDate: "2025-03-01T00:00:00Z",
    iconName: "Car"
  }
];

export const mockChartData = {
  portfolio: [
    { name: "Jan", value: 10000 },
    { name: "Feb", value: 10200 },
    { name: "Mar", value: 10150 },
    { name: "Apr", value: 10400 },
    { name: "May", value: 10800 },
    { name: "Jun", value: 11100 },
    { name: "Jul", value: 11400 },
    { name: "Aug", value: 11200 },
    { name: "Sep", value: 11800 },
    { name: "Oct", value: 12200 },
    { name: "Nov", value: 12500 },
    { name: "Dec", value: 15830 }
  ],
  spending: [
    { name: "Groceries", value: 350 },
    { name: "Utilities", value: 280 },
    { name: "Rent", value: 1200 },
    { name: "Transportation", value: 150 },
    { name: "Dining", value: 220 },
    { name: "Entertainment", value: 100 },
    { name: "Healthcare", value: 180 },
    { name: "Other", value: 140 }
  ]
};
