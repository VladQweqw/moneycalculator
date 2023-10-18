
export type historyType = {
    type: 'SUBSTRACT' | 'ADD',
    reason: string,
    total: number,
    date: number,
}

export type historyCollection = {
    date: number,
    logs: historyType[];

}
