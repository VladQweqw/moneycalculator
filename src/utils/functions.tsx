export const currencyValues: any = {
    'RON': 1,
    'EUR': 4.96, 
    'USD': 4.63,
}

export function currencyConvertor(total: number, from: string, to: string): string {
    let convertedTotal = 0;
    
    let fromToRON = (total * currencyValues[from])
    convertedTotal = fromToRON / currencyValues[to];
    
    return Number.parseFloat(convertedTotal.toString()).toFixed(2);
}


export const phrases = [
    'Ne manca foamea',
    'Merge',
    'Joaca la aparate',
    'Esti serif',
    'Lautar'
 ]

export const parent = {
    animate: {
        transition: {
            staggerChildren: .1
        }
    }
}
export const child = {
    initial: {
        translateY: '100px',
        scale: 0 
    },
    animate: {
        translateY: '0px',
        scale: 1
    }
}

export function saveToLocal(name: string, data: any) {
    localStorage.setItem(name, data);
}
export function getFromLocal(name: string): any {
    return localStorage.getItem(name);
    
}


export function calculateTotalBalance(data: any) {
    const {type, total, currency} = data;
    
    let previousBalance = parseInt(JSON.parse(getFromLocal('balance'))) || 0;
    let balance = previousBalance;
    
    if(type === 'ADD') {
        balance += total * currencyValues[currency];
    }else {
        balance -= total * currencyValues[currency];
    }     
    
    saveToLocal('balance', JSON.stringify(balance));
    return balance;
}

export function getDateFromMs(ms: number): {
    year: number,
    day: number,
    minutes: string,
    hours: string,
    month: number,
    formatedMonth: string,
    formatedDay: string,
    stringDate: () => string,
} {
    const date = new Date(ms);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov', 'Dec'];

    let year = date.getFullYear()
    let day = date.getDate()
    let minutes = date.getMinutes().toString().padStart(2, '0')
    let hours = date.getHours().toString().padStart(2, '0')
    let month = date.getMonth()

    let formatedDay = day.toString().padStart(2, '0');
    let formatedMonth = months[month];

    function stringDate(): string {
        return `${formatedDay} ${formatedMonth} ${year}`
    }

    return {
        year,
        day,
        minutes,
        hours,
        month,
        formatedMonth,
        formatedDay,
        stringDate,
    }
}


