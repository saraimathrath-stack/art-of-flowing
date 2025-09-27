import { loadFromLocalStorage } from './localStorage';

export interface BackupData {
  version: string;
  timestamp: string;
  data: {
    income: number;
    bills: number;
    debt: number;
    incomeStreams: any[];
    monthlyData: any[];
    customPots: any[];
    recurringBills: any[];
    cumulativeSavings: any;
    projects: any[];
    reflectionEntries: any[];
    wisdomEntries: any[];
  };
}

export function downloadDataBackup(): void {
  try {
    // Collect all data from localStorage
    const backupData: BackupData = {
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      data: {
        income: loadFromLocalStorage('income', 0),
        bills: loadFromLocalStorage('bills', 0),
        debt: loadFromLocalStorage('debt', 0),
        incomeStreams: loadFromLocalStorage('income-streams', []),
        monthlyData: loadFromLocalStorage('monthly-data', []),
        customPots: loadFromLocalStorage('custom-pots', []),
        recurringBills: loadFromLocalStorage('recurring-bills', []),
        cumulativeSavings: loadFromLocalStorage('cumulative-savings', {}),
        projects: loadFromLocalStorage('projects-list', []),
        reflectionEntries: loadFromLocalStorage('reflection-entries', []),
        wisdomEntries: loadFromLocalStorage('wisdom-entries', [])
      }
    };

    // Create and download the file
    const dataStr = JSON.stringify(backupData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `art-of-flowing-backup-${new Date().toISOString().split('T')[0]}.json`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to create backup:', error);
    throw new Error('Failed to create backup');
  }
}

export function importAllData(backupJson: string): boolean {
  try {
    const backupData: BackupData = JSON.parse(backupJson);
    
    // Validate backup data structure
    if (!backupData.data || !backupData.version) {
      throw new Error('Invalid backup file format');
    }

    // Import all data to localStorage
    Object.entries(backupData.data).forEach(([key, value]) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.warn(`Failed to import ${key}:`, error);
      }
    });

    return true;
  } catch (error) {
    console.error('Failed to import data:', error);
    return false;
  }
}

export function clearAllData(): void {
  try {
    const keysToClear = [
      'income',
      'bills',
      'debt',
      'income-streams',
      'monthly-data',
      'custom-pots',
      'recurring-bills',
      'cumulative-savings',
      'projects-list',
      'reflection-entries',
      'wisdom-entries'
    ];

    keysToClear.forEach(key => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error('Failed to clear data:', error);
    throw new Error('Failed to clear data');
  }
}


