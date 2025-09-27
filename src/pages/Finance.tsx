import React, { useState, useEffect } from "react";
import { saveToLocalStorage, loadFromLocalStorage, checkLocalStorageHealth, getLocalStorageUsage } from "../utils/localStorage";
import { downloadDataBackup, importAllData, clearAllData } from "../utils/dataBackup";
import { useCurrency } from "../context/CurrencyContext";
import "./Finance.css";
import "./Finance-literature.css";

const defaultPots = [
  { name: "Freedom Fund", percent: 0.20, color: "#87e8b1", description: "Emergency savings & financial freedom" },
  { name: "Debt Payoff", percent: 0.15, color: "#ff6b6b", description: "Pay off debts and loans" },
  { name: "Investment", percent: 0.12, color: "#90cdf4", description: "Long-term wealth building" },
  { name: "Give Back", percent: 0.08, color: "#e8b1d7", description: "Charity & helping others" },
  { name: "Play Money", percent: 0.10, color: "#ffd591", description: "Fun, experiences & treats" },
  { name: "Learning", percent: 0.05, color: "#a8e6cf", description: "Courses, books & growth" },
];

interface RecurringBill {
  id: string;
  name: string;
  amount: number;
  category: string;
  dueDate: number;
}

interface IncomeStream {
  id: string;
  name: string;
  amount: number;
  category: string;
}

interface MonthlyData {
  month: string;
  year: number;
  income: number;
  bills: number;
  allocations: {[key: string]: number};
  totalSavings: number;
}

export const Finance: React.FC = () => {
  const { formatCurrency } = useCurrency();
  const [income, setIncome] = useState<number>(loadFromLocalStorage("income", 0));
  const [bills, setBills] = useState<number>(loadFromLocalStorage("bills", 0));

  const [incomeStreams, setIncomeStreams] = useState<IncomeStream[]>(loadFromLocalStorage("income-streams", []));
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>(loadFromLocalStorage("monthly-data", []));
  const [selectedMonth, setSelectedMonth] = useState<string>(new Date().toISOString().slice(0, 7)); // YYYY-MM format

  const [customPots, setCustomPots] = useState<any[]>(loadFromLocalStorage("custom-pots", []));
  const [recurringBills, setRecurringBills] = useState<RecurringBill[]>(loadFromLocalStorage("recurring-bills", [
    { id: "1", name: "Netflix", amount: 15, category: "Entertainment", dueDate: 1 },
    { id: "2", name: "Spotify", amount: 10, category: "Entertainment", dueDate: 5 },
    { id: "3", name: "Gym Membership", amount: 50, category: "Health", dueDate: 15 },
    { id: "4", name: "Phone Bill", amount: 80, category: "Utilities", dueDate: 20 },
    { id: "5", name: "Internet", amount: 60, category: "Utilities", dueDate: 25 },
    { id: "6", name: "Rent", amount: 600, category: "Housing", dueDate: 1 }
  ]));
  const [debt, setDebt] = useState<number>(loadFromLocalStorage("debt", 0));
  const [cumulativeSavings, setCumulativeSavings] = useState<{[key: string]: number}>(loadFromLocalStorage("cumulative-savings", {}));
  const [showAddPot, setShowAddPot] = useState(false);
  const [showAddBill, setShowAddBill] = useState(false);
  const [newPotName, setNewPotName] = useState("");
  const [newPotPercent, setNewPotPercent] = useState(0);
  const [newBillName, setNewBillName] = useState("");
  const [newBillAmount, setNewBillAmount] = useState(0);
  const [newBillCategory, setNewBillCategory] = useState("");
  const [newBillDueDate, setNewBillDueDate] = useState(1);
  
  const allPots = [...defaultPots, ...customPots];
  const pots = allPots.map(pot => ({
    ...pot,
    amount: Math.round((income - bills) * pot.percent)
  }));
  const allocated = pots.reduce((a, p) => a + p.amount, 0);
  const unallocated = Math.max(income - bills - allocated, 0);
  const totalPercentage = allPots.reduce((sum, pot) => sum + pot.percent, 0);

  // Auto-save data when state changes
  useEffect(() => {
    saveToLocalStorage("income", income);
  }, [income]);

  useEffect(() => {
    saveToLocalStorage("bills", bills);
  }, [bills]);

  useEffect(() => {
    saveToLocalStorage("debt", debt);
  }, [debt]);

  useEffect(() => {
    saveToLocalStorage("income-streams", incomeStreams);
  }, [incomeStreams]);

  useEffect(() => {
    saveToLocalStorage("monthly-data", monthlyData);
  }, [monthlyData]);

  useEffect(() => {
    saveToLocalStorage("custom-pots", customPots);
  }, [customPots]);

  useEffect(() => {
    saveToLocalStorage("recurring-bills", recurringBills);
  }, [recurringBills]);

  useEffect(() => {
    saveToLocalStorage("cumulative-savings", cumulativeSavings);
  }, [cumulativeSavings]);

  function handleIncomeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value);
    setIncome(value);
  }
  
  function handleBillsChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value);
    setBills(value);
  }
  
  function handleDebtChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value);
    setDebt(value);
  }

  function addMonthlySavings() {
    const availableAmount = income - bills;
    if (availableAmount <= 0) return;

    const newCumulativeSavings = { ...cumulativeSavings };
    const allocations: {[key: string]: number} = {};
    
    allPots.forEach(pot => {
      const monthlyAmount = Math.round(availableAmount * pot.percent);
      newCumulativeSavings[pot.name] = (newCumulativeSavings[pot.name] || 0) + monthlyAmount;
      allocations[pot.name] = monthlyAmount;
    });

    // Save monthly data
    const currentMonthData: MonthlyData = {
      month: selectedMonth,
      year: new Date().getFullYear(),
      income: income,
      bills: bills,
      allocations: allocations,
      totalSavings: availableAmount
    };

    const updatedMonthlyData = monthlyData.filter(data => data.month !== selectedMonth);
    updatedMonthlyData.push(currentMonthData);
    setMonthlyData(updatedMonthlyData);

    setCumulativeSavings(newCumulativeSavings);
  }

  function addIncomeStream() {
    const name = prompt("Enter income stream name:");
    const amount = prompt("Enter monthly amount:");
    const category = prompt("Enter category (e.g., Salary, Freelance, Investment):");
    
    if (name && amount && category && !isNaN(Number(amount))) {
      const newStream: IncomeStream = {
        id: Date.now().toString(),
        name: name,
        amount: Number(amount),
        category: category
      };
      
      const updatedStreams = [...incomeStreams, newStream];
      setIncomeStreams(updatedStreams);
      
      // Update total income
      const totalIncome = updatedStreams.reduce((sum, stream) => sum + stream.amount, 0);
      setIncome(totalIncome);
    }
  }

  function removeIncomeStream(id: string) {
    const updatedStreams = incomeStreams.filter(stream => stream.id !== id);
    setIncomeStreams(updatedStreams);
    
    // Update total income
    const totalIncome = updatedStreams.reduce((sum, stream) => sum + stream.amount, 0);
    setIncome(totalIncome);
  }

  function handleQuickSetIncome() {
    const newIncome = prompt("Enter your monthly income:", income.toString());
    if (newIncome !== null && !isNaN(Number(newIncome))) {
      setIncome(Number(newIncome));
    }
  }

  function handleQuickSetBills() {
    const newBills = prompt("Enter your monthly bills:", bills.toString());
    if (newBills !== null && !isNaN(Number(newBills))) {
      setBills(Number(newBills));
    }
  }

  function handleAddPot() {
    if (newPotName && newPotPercent > 0) {
      const newPot = {
        name: newPotName,
        percent: newPotPercent / 100,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
        description: "Custom money pot"
      };
      const updatedPots = [...customPots, newPot];
      setCustomPots(updatedPots);
      setNewPotName("");
      setNewPotPercent(0);
      setShowAddPot(false);
    }
  }

  function handleAddBill() {
    if (newBillName && newBillAmount > 0) {
      const newBill: RecurringBill = {
        id: Date.now().toString(),
        name: newBillName,
        amount: newBillAmount,
        category: newBillCategory || "Other",
        dueDate: newBillDueDate
      };
      const updatedBills = [...recurringBills, newBill];
      setRecurringBills(updatedBills);
      setNewBillName("");
      setNewBillAmount(0);
      setNewBillCategory("");
      setNewBillDueDate(1);
      setShowAddBill(false);
    }
  }

  function handleDeleteBill(id: string) {
    const updatedBills = recurringBills.filter(bill => bill.id !== id);
    setRecurringBills(updatedBills);
  }

  function handleDeletePot(index: number) {
    const updatedPots = customPots.filter((_, i) => i !== index);
    setCustomPots(updatedPots);
  }

  // Calculate total recurring bills
  const totalRecurringBills = recurringBills.reduce((sum, bill) => sum + bill.amount, 0);

  // Financial wisdom tips
  const financialTips = [
    "Save 10% of your income first, then pay your bills - pay yourself first!",
    "Give: generosity attracts abundance. The more you give, the more you receive.",
    "Invest early and consistently. Time in the market beats timing the market.",
    "Emergency fund: aim for 3-6 months of expenses in your Freedom Fund.",
    "Compound interest is the eighth wonder of the world - start investing today.",
    "A part of all you earn is yours to keep - make it at least 10%.",
    "Don't save what is left after spending; spend what is left after saving.",
    "The habit of saving is itself an education; it fosters every virtue.",
    "Money is a tool. Use it wisely to build the life you want.",
    "Financial freedom isn't about having money; it's about having options."
  ];

  // Top 10 Financial Literature
  const financialLiterature = [
    {
      title: "The Richest Man in Babylon",
      author: "George S. Clason",
      year: "1926",
      keyLesson: "Pay yourself first - save 10% of everything you earn",
      wisdom: "A part of all you earn is yours to keep. It should be not less than one-tenth."
    },
    {
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      year: "1997",
      keyLesson: "Assets put money in your pocket, liabilities take money out",
      wisdom: "The poor and middle class work for money. The rich have money work for them."
    },
    {
      title: "The Millionaire Next Door",
      author: "Thomas J. Stanley & William D. Danko",
      year: "1996",
      keyLesson: "Wealth is built through frugality and smart investing",
      wisdom: "Most millionaires are first-generation wealthy and live below their means."
    },
    {
      title: "Think and Grow Rich",
      author: "Napoleon Hill",
      year: "1937",
      keyLesson: "Success starts with the right mindset and burning desire",
      wisdom: "Whatever the mind can conceive and believe, it can achieve."
    },
    {
      title: "The Intelligent Investor",
      author: "Benjamin Graham",
      year: "1949",
      keyLesson: "Value investing and margin of safety principles",
      wisdom: "The intelligent investor is a realist who sells to optimists and buys from pessimists."
    },
    {
      title: "Your Money or Your Life",
      author: "Vicki Robin & Joe Dominguez",
      year: "1992",
      keyLesson: "Calculate the true cost of your purchases in life energy",
      wisdom: "Money is something we choose to trade our life energy for."
    },
    {
      title: "The Total Money Makeover",
      author: "Dave Ramsey",
      year: "2003",
      keyLesson: "Debt is the enemy of wealth building",
      wisdom: "Live like no one else so later you can live like no one else."
    },
    {
      title: "A Random Walk Down Wall Street",
      author: "Burton G. Malkiel",
      year: "1973",
      keyLesson: "Market timing is futile - invest in index funds",
      wisdom: "The market is efficient in the long run, making stock picking a loser's game."
    },
    {
      title: "The Little Book of Common Sense Investing",
      author: "John C. Bogle",
      year: "2007",
      keyLesson: "Low-cost index funds beat active management",
      wisdom: "Don't look for the needle in the haystack. Just buy the haystack!"
    },
    {
      title: "The Psychology of Money",
      author: "Morgan Housel",
      year: "2020",
      keyLesson: "Financial success is more about behavior than knowledge",
      wisdom: "The highest form of wealth is the ability to wake up every morning and say, 'I can do whatever I want today.'"
    }
  ];

  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [showLiterature, setShowLiterature] = useState(false);

  // Function to add sample data
  const addSampleData = () => {
    const sampleData = {
      month: "2024-01",
      year: 2024,
      income: 3500,
      bills: 815,
      allocations: {
        "Freedom Fund": 537,
        "Debt Payoff": 403,
        "Investment": 322,
        "Give Back": 215,
        "Play Money": 268,
        "Learning": 134
      },
      totalSavings: 2685
    };

    const existingData = loadFromLocalStorage<MonthlyData[]>("monthly-data", []);
    const hasJanuaryData = existingData.some(data => data.month === "2024-01");
    
    if (!hasJanuaryData) {
      const updatedData = [...existingData, sampleData];
      setMonthlyData(updatedData);
    }
  };

  // Function to handle data backup
  const handleDataBackup = () => {
    try {
      downloadDataBackup();
      alert('Data backup downloaded successfully!');
    } catch (error) {
      alert('Failed to create backup. Please try again.');
    }
  };

  // Function to handle data restore
  const handleDataRestore = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const result = e.target?.result as string;
            const success = importAllData(result);
            if (success) {
              alert('Data restored successfully! The page will refresh.');
              window.location.reload();
            } else {
              alert('Failed to restore data. Please check the file format.');
            }
          } catch (error) {
            alert('Failed to restore data. Please check the file format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  // Function to clear all data
  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      clearAllData();
    }
  };

  // Function to check and restore data
  const checkDataIntegrity = () => {
    const allData = {
      income: loadFromLocalStorage("income", 0),
      bills: loadFromLocalStorage("bills", 0),
      projects: loadFromLocalStorage("projects-list", []),
      monthlyData: loadFromLocalStorage("monthly-data", []),
      customPots: loadFromLocalStorage("custom-pots", []),
      recurringBills: loadFromLocalStorage("recurring-bills", []),
      debt: loadFromLocalStorage("debt", 0),
      cumulativeSavings: loadFromLocalStorage("cumulative-savings", {})
    };

    const storageHealth = checkLocalStorageHealth();
    const storageUsage = getLocalStorageUsage();

    console.log("Current data in localStorage:", allData);
    alert(`Data Status:
Income: ${allData.income}
Bills: ${allData.bills}
Projects: ${allData.projects.length}
Monthly Data: ${allData.monthlyData.length}
Custom Pots: ${allData.customPots.length}
Recurring Bills: ${allData.recurringBills.length}
Debt: ${allData.debt}
Cumulative Savings: ${Object.keys(allData.cumulativeSavings).length} pots

Storage Health: ${storageHealth ? '✅ Healthy' : '❌ Issues detected'}
Storage Usage: ${storageUsage.percentage.toFixed(1)}% (${(storageUsage.used / 1024).toFixed(1)}KB used)`);
  };

  // Rotate tips every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % financialTips.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Circle diagram data - ensure full circle
  const circleTotalPercentage = allPots.reduce((sum, pot) => sum + pot.percent, 0);
  const normalizedPots = allPots.map(pot => ({
    ...pot,
    percent: circleTotalPercentage > 0 ? pot.percent / circleTotalPercentage : 0
  }));
  
  const circleData = normalizedPots.map((pot, index) => ({
    ...pot,
    startAngle: index === 0 ? 0 : normalizedPots.slice(0, index).reduce((sum, p) => sum + p.percent * 360, 0),
    endAngle: normalizedPots.slice(0, index + 1).reduce((sum, p) => sum + p.percent * 360, 0)
  }));

  return (
    <main className="finance-page">
      <div className="finance-header">
        <h1>Finance</h1>
        <p>Manage your money with intention and wisdom</p>
      </div>
      
      {/* Financial Wisdom Panel - Moved to Top */}
      <section className="wisdom-section">
        <div className="wisdom-header">
          <h3>💡 Financial Wisdom</h3>
          <p>Tips, Education & Mindset</p>
          <button 
            className="literature-toggle-btn"
            onClick={() => setShowLiterature(!showLiterature)}
          >
            {showLiterature ? '📚 Hide Literature' : '📚 Show Top 10 Financial Books'}
          </button>
        </div>
        
        <div className="wisdom-panel">
          <div className="wisdom-tip">
            <div className="tip-content">
              <div className="tip-icon">📚</div>
              <div className="tip-text">{financialTips[currentTipIndex]}</div>
            </div>
            <div className="tip-source">
              <span>From The Richest Man in Babylon & Financial Wisdom</span>
            </div>
          </div>
          
          <div className="wisdom-dots">
            {financialTips.map((_, index) => (
              <div 
                key={index}
                className={`wisdom-dot ${index === currentTipIndex ? 'active' : ''}`}
                onClick={() => setCurrentTipIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Expandable Literature Section */}
        {showLiterature && (
          <div className="literature-expanded">
            <div className="literature-header">
              <h4>📚 Top 10 Financial Literature</h4>
              <p>Essential books that have shaped financial thinking for generations</p>
            </div>
            
            <div className="literature-grid">
              {financialLiterature.map((book, index) => (
                <div key={book.title} className="book-card">
                  <div className="book-header">
                    <div className="book-number">#{index + 1}</div>
                    <div className="book-info">
                      <h5 className="book-title">{book.title}</h5>
                      <div className="book-author">{book.author} ({book.year})</div>
                    </div>
                  </div>
                  <div className="book-content">
                    <div className="book-lesson">
                      <strong>Key Lesson:</strong> {book.keyLesson}
                    </div>
                    <div className="book-wisdom">
                      <em>"{book.wisdom}"</em>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>


      {/* Financial Freedom Section - Savings Counter */}
      <section className="financial-freedom-section">
        <h3>Financial Freedom Goal</h3>
        <div className="savings-counter">
          <div className="savings-goal">
            <div className="goal-title">Target: {formatCurrency(1000000)}</div>
            <div className="goal-progress">
              <div className="progress-bar-container">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${Math.min(((income - bills) * 0.20 * 12) / 1000000 * 100, 100)}%` }}
                  ></div>
                </div>
                <span className="progress-percent">
                  {((income - bills) * 0.20 * 12) / 1000000 * 100 < 100 ? 
                    `${(((income - bills) * 0.20 * 12) / 1000000 * 100).toFixed(2)}%` : 
                    '100%'
                  }
                </span>
              </div>
            </div>
            <div className="goal-stats">
              <div className="stat-item">
                <span className="stat-label">Annual Savings:</span>
                <span className="stat-value">{formatCurrency(Math.round((income - bills) * 0.20 * 12))}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Years to Goal:</span>
                <span className="stat-value">
                  {((income - bills) * 0.20 * 12) > 0 ? 
                    Math.ceil(1000000 / ((income - bills) * 0.20 * 12)) : 
                    '∞'
                  } years
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Income & Expenses Section */}
      <section className="income-expenses-section">
        <h3>Income & Expenses - {new Date(selectedMonth + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
        
        {/* Income Streams */}
        <div className="income-streams">
          <div className="section-subheader">
            <h4>Income Streams</h4>
            <button onClick={addIncomeStream} className="add-stream-btn">+ Add Income Stream</button>
          </div>
          
          {incomeStreams.length > 0 ? (
            <div className="streams-list">
              {incomeStreams.map(stream => (
                <div key={stream.id} className="stream-card">
                  <div className="stream-info">
                    <div className="stream-name">{stream.name}</div>
                    <div className="stream-category">{stream.category}</div>
                  </div>
                  <div className="stream-amount">{formatCurrency(stream.amount)}</div>
                  <button 
                    onClick={() => removeIncomeStream(stream.id)}
                    className="remove-stream-btn"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-streams">
              <p>No income streams added yet. Click "Add Income Stream" to get started.</p>
            </div>
          )}
          
          <div className="total-income">
            <span>Total Monthly Income:</span>
            <strong>{formatCurrency(income)}</strong>
          </div>
        </div>
        
        <div className="input-group">
          <div className="input-row">
            <label>Monthly Bills & Fixed Expenses:</label>
            <button onClick={handleQuickSetBills} className="quick-set-btn">Quick Set</button>
          </div>
          <input
            type="number"
            value={bills}
            onChange={handleBillsChange}
            placeholder="Enter your monthly bills"
            className="finance-input"
          />
        </div>
        
        {income > 0 && (
          <div className="summary-box">
            <div className="summary-row">
              <span>Available for allocation:</span>
              <strong>{formatCurrency(income - bills)}</strong>
            </div>
            <div className="summary-row">
              <span>Allocation percentage:</span>
              <strong>{Math.round(totalPercentage * 100)}%</strong>
            </div>
          </div>
        )}
      </section>

      {/* Debt Section */}
      <section className="debt-section">
        <h3>Debt Management</h3>
        <div className="input-group">
          <label>Total Debt:</label>
          <input
            type="number"
            value={debt}
            onChange={handleDebtChange}
            placeholder="Enter your total debt"
            className="finance-input"
          />
        </div>
        <div className="debt-info">
          <div className="debt-item">
            <span className="debt-label">Monthly Debt Payment:</span>
            <span className="debt-value">{formatCurrency(Math.round((income - bills) * 0.15))}</span>
          </div>
          <div className="debt-item">
            <span className="debt-label">Months to Pay Off:</span>
            <span className="debt-value">{debt > 0 && (income - bills) > 0 ? Math.ceil(debt / ((income - bills) * 0.15)) : 0} months</span>
          </div>
        </div>
      </section>

      {/* Money Pots Section */}
      <section className="money-pots-section">
        <div className="section-header">
          <h3>Money Pots</h3>
          <div className="header-buttons">
            <button onClick={addMonthlySavings} className="add-monthly-btn">
              💰 Add Monthly Savings
            </button>
            <button onClick={() => setShowAddPot(true)} className="add-btn">+ Add Pot</button>
          </div>
        </div>
        
        <div className="pots-grid">
          {pots.map((pot, index) => (
            <div key={pot.name} className="pot-card">
              <div className="pot-header">
                <div className="pot-color" style={{ backgroundColor: pot.color }}></div>
                <div className="pot-info">
                  <div className="pot-name">{pot.name}</div>
                  <div className="pot-description">{pot.description}</div>
                </div>
                <div className="pot-amount">
                  <div className="amount">
                    <div className="monthly-amount">{formatCurrency(pot.amount)}/month</div>
                    <div className="cumulative-amount">
                      Total: {formatCurrency(cumulativeSavings[pot.name] || 0)}
                    </div>
                  </div>
                  <div className="percentage">{Math.round(pot.percent * 100)}%</div>
                </div>
                {index >= defaultPots.length && (
                  <button 
                    onClick={() => handleDeletePot(index - defaultPots.length)}
                    className="delete-btn"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {showAddPot && (
          <div className="add-form">
            <h4>Add New Money Pot</h4>
            <input
              type="text"
              value={newPotName}
              onChange={(e) => setNewPotName(e.target.value)}
              placeholder="Pot name"
              className="form-input"
            />
            <input
              type="number"
              value={newPotPercent}
              onChange={(e) => setNewPotPercent(Number(e.target.value))}
              placeholder="Percentage (e.g., 10)"
              className="form-input"
            />
            <div className="form-actions">
              <button onClick={handleAddPot} className="save-btn">Add Pot</button>
              <button onClick={() => setShowAddPot(false)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        )}

        <div className="allocation-summary">
          <div className={`summary-item ${unallocated > 0 ? 'warning' : 'success'}`}>
            <span>Unallocated: ${unallocated.toLocaleString()}</span>
            {unallocated > 0 && <p>Consider adding more allocation percentages!</p>}
            {unallocated === 0 && totalPercentage > 0 && <p>Perfect allocation! Every dollar has a purpose.</p>}
          </div>
        </div>
      </section>

      {/* Circle Diagram */}
      <section className="circle-diagram-section">
        <h3>Money Allocation</h3>
        <div className="circle-container">
          <svg className="circle-diagram" viewBox="0 0 200 200">
            {circleData.map((pot, index) => {
              const startAngle = pot.startAngle;
              const endAngle = pot.endAngle;
              const radius = 80;
              const centerX = 100;
              const centerY = 100;
              
              const startAngleRad = (startAngle - 90) * Math.PI / 180;
              const endAngleRad = (endAngle - 90) * Math.PI / 180;
              
              const x1 = centerX + radius * Math.cos(startAngleRad);
              const y1 = centerY + radius * Math.sin(startAngleRad);
              const x2 = centerX + radius * Math.cos(endAngleRad);
              const y2 = centerY + radius * Math.sin(endAngleRad);
              
              const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
              
              const pathData = [
                `M ${centerX} ${centerY}`,
                `L ${x1} ${y1}`,
                `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                'Z'
              ].join(' ');
              
              return (
                <path
                  key={pot.name}
                  d={pathData}
                  fill={pot.color}
                  stroke="white"
                  strokeWidth="2"
                />
              );
            })}
          </svg>
          <div className="circle-legend">
            {pots.map(pot => (
              <div key={pot.name} className="legend-item">
                <div className="legend-color" style={{ backgroundColor: pot.color }}></div>
                <span>{pot.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recurring Bills Section */}
      <section className="recurring-bills-section">
        <div className="section-header">
          <h3>Recurring Bills & Subscriptions</h3>
          <button onClick={() => setShowAddBill(true)} className="add-btn">+ Add Bill</button>
        </div>
        
        <div className="bills-grid">
          {recurringBills.map(bill => (
            <div key={bill.id} className="bill-card">
              <div className="bill-info">
                <div className="bill-name">{bill.name}</div>
                <div className="bill-category">{bill.category}</div>
              </div>
              <div className="bill-details">
                <div className="bill-amount">{formatCurrency(bill.amount)}</div>
                <div className="bill-due">Due: {bill.dueDate}{bill.dueDate === 1 ? 'st' : bill.dueDate === 2 ? 'nd' : bill.dueDate === 3 ? 'rd' : 'th'}</div>
              </div>
              <button 
                onClick={() => handleDeleteBill(bill.id)}
                className="delete-btn"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {showAddBill && (
          <div className="add-form">
            <h4>Add New Recurring Bill</h4>
            <input
              type="text"
              value={newBillName}
              onChange={(e) => setNewBillName(e.target.value)}
              placeholder="Bill name"
              className="form-input"
            />
            <input
              type="number"
              value={newBillAmount}
              onChange={(e) => setNewBillAmount(Number(e.target.value))}
              placeholder="Amount"
              className="form-input"
            />
            <input
              type="text"
              value={newBillCategory}
              onChange={(e) => setNewBillCategory(e.target.value)}
              placeholder="Category"
              className="form-input"
            />
            <input
              type="number"
              value={newBillDueDate}
              onChange={(e) => setNewBillDueDate(Number(e.target.value))}
              placeholder="Due date (1-31)"
              className="form-input"
              min="1"
              max="31"
            />
            <div className="form-actions">
              <button onClick={handleAddBill} className="save-btn">Add Bill</button>
              <button onClick={() => setShowAddBill(false)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        )}

        <div className="bills-summary">
          <div className="summary-item">
            <span>Total Monthly Bills: {formatCurrency(totalRecurringBills)}</span>
          </div>
        </div>
      </section>

      
             {/* Yearly Overview Section */}
             <section className="yearly-overview-section">
               <div className="section-header">
                 <h3>Yearly Overview</h3>
                 <div className="header-buttons">
                   <button onClick={addSampleData} className="add-btn">
                     📊 Add Sample Data
                   </button>
                   <button onClick={checkDataIntegrity} className="add-btn" style={{ background: "#FF9800" }}>
                     🔍 Check Data
                   </button>
                   <button onClick={handleDataBackup} className="add-btn" style={{ background: "#4CAF50" }}>
                     💾 Backup Data
                   </button>
                   <button onClick={handleDataRestore} className="add-btn" style={{ background: "#2196F3" }}>
                     📥 Restore Data
                   </button>
                   <button onClick={handleClearData} className="add-btn" style={{ background: "#f44336" }}>
                     🗑️ Clear All Data
                   </button>
                 </div>
               </div>
        
        {/* Month Selection */}
        <div className="month-selector">
          <h4>Select Month</h4>
          <div className="months-grid">
            {Array.from({ length: 12 }, (_, i) => {
              const month = new Date(2024, i).toLocaleDateString('en-US', { month: 'short' });
              const monthKey = `2024-${String(i + 1).padStart(2, '0')}`;
              const hasData = monthlyData.some(data => data.month === monthKey);
              
              return (
                <button
                  key={monthKey}
                  className={`month-btn ${selectedMonth === monthKey ? 'active' : ''} ${hasData ? 'has-data' : ''}`}
                  onClick={() => setSelectedMonth(monthKey)}
                >
                  {month}
                  {hasData && <span className="data-indicator">●</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Monthly Allocation Breakdown */}
        {monthlyData.length > 0 && (
          <div className="monthly-breakdown">
            <h4>Where Your Money Went - {new Date(selectedMonth + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h4>
            
            {(() => {
              const currentMonthData = monthlyData.find(data => data.month === selectedMonth);
              if (!currentMonthData) {
                return <p className="no-data">No data available for this month.</p>;
              }
              
              return (
                <div className="breakdown-content">
                  <div className="monthly-summary">
                    <div className="summary-card">
                      <div className="summary-label">Total Income</div>
                      <div className="summary-value">{formatCurrency(currentMonthData.income)}</div>
                    </div>
                    <div className="summary-card">
                      <div className="summary-label">Total Bills</div>
                      <div className="summary-value">{formatCurrency(currentMonthData.bills)}</div>
                    </div>
                    <div className="summary-card">
                      <div className="summary-label">Available</div>
                      <div className="summary-value">{formatCurrency(currentMonthData.totalSavings)}</div>
                    </div>
                  </div>
                  
                  <div className="allocations-breakdown">
                    <h5>Money Allocations</h5>
                    <div className="allocations-list">
                      {Object.entries(currentMonthData.allocations).map(([potName, amount]) => (
                        <div key={potName} className="allocation-item">
                          <div className="allocation-name">{potName}</div>
                          <div className="allocation-amount">{formatCurrency(amount)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </section>
      
      <div className="finance-footer">
        <span>Remember: Pay yourself first, then pay others 🌟</span>
      </div>
    </main>
  );
};