
export type historyType = {
    type: 'SUBSTRACT' | 'ADD',
    reason: string,
    total: number,
    date: number,
    currency: string,
    source: string,
}

export type SourceType = {
    name: string,
    total: number
}

export type historyCollection = {
    date: number,
    logs: historyType[];

}
export type currencyType = 'RON' | 'EUR' | 'USD';
