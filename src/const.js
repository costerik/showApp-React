export const LOADING = 'LOADING';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';

export const MOVIES='Movies';
export const SERIES='Series';
export const FAVORITES='Favorites';

export const years = () => {
    const years = [...Array(1 + 2017 - 1990).keys()].map(v => 1990 + v).reverse();
    let yearsObject = [];
    for (const year in years) {
        yearsObject.push({ value: years[year], label: years[year].toString() })
    }
    return yearsObject;
}