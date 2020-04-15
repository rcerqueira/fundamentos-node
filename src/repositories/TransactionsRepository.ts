import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private totalIncome = 0;

  private totalOutcome = 0;

  private total = 0;

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const reducer = (accumulator: number, currentValue: number): number =>
      accumulator + currentValue;

    this.totalIncome = 0;
    this.totalOutcome = 0;
    this.total = 0;

    if (this.transactions.find(el => el.type === 'income'))
      this.totalIncome = this.transactions
        .filter(el => el.type === 'income')
        .map(transaction => transaction.value)
        .reduce(reducer);

    if (this.transactions.find(el => el.type === 'outcome'))
      this.totalOutcome = this.transactions
        .filter(el => el.type === 'outcome')
        .map(transaction => transaction.value)
        .reduce(reducer);

    this.total = this.totalIncome - this.totalOutcome;

    return {
      income: this.totalIncome,
      outcome: this.totalOutcome,
      total: this.total,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
