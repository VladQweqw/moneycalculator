export const currencyValues: any = {
    'RON': 1,
    'EUR': 4.96, 
    'USD': 4.36,
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

export function formatDate(date: number): string {
    const d = new Date(date);
    const months = ['Dec', 'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov'];
    const hours = d.getHours().toString().padStart(2, '0')
    const minutes = d.getMinutes().toString().padStart(2, '0')
    

    const day = d.getDay().toString().padStart(2, '0')
    const month = months[d.getMonth()]

    return `${day} ${month} ${d.getFullYear()}, ${
        hours
    }:${minutes}`;
}