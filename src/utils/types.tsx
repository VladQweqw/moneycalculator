
export type historyType = {
    type: 'SUBSTRACT' | 'ADD',
    reason: string,
    total: number,
    date: number,
    currency: string,
}

export type historyCollection = {
    date: number,
    logs: historyType[];

}
export type currencyType = 'RON' | 'EUR' | 'USD';
