
import { 
  mockUserData, 
  mockAccountData, 
  mockTransactions, 
  mockInvestments, 
  mockSavingsGoals,
  mockChartData
} from '../lib/mockData';

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // User Profile
  fetchUserProfile: async () => {
    await delay(800);
    return mockUserData;
  },
  
  // Account Data
  fetchAccountSummary: async () => {
    await delay(1000);
    return mockAccountData;
  },
  
  // Transactions
  fetchTransactions: async (limit = 10) => {
    await delay(1200);
    return mockTransactions.slice(0, limit);
  },
  
  // Investments
  fetchInvestments: async () => {
    await delay(1500);
    return mockInvestments;
  },
  
  // Savings Goals
  fetchSavingsGoals: async () => {
    await delay(900);
    return mockSavingsGoals;
  },
  
  // Chart Data
  fetchChartData: async (type) => {
    await delay(1000);
    return mockChartData[type] || [];
  }
};
