export interface Proposal {
    id: number;
    area: string;
    newlegs: number;
    wop: number;
    incdec: number;
    initprop: number;
    addprop: number;
    lowerboundary: number;
    upperboundary: number;
    addpropincdec: number;
}

export function getProposals(): Proposal[] {
    return INITIAL_PROPOSALS_STORE;
}

const INITIAL_PROPOSALS_STORE: Proposal[] = [
    {
        id: 1,
        'area': 'FRA',
        'newlegs': 187848,
        'wop': 69.33,
        'incdec': 20.69,
        'initprop': 90.05,
        'addprop': 10,
        'lowerboundary': 90,
        'upperboundary': 110,
        'addpropincdec': -20.69,
    },
    {
        id: 2,
        'area': 'MUC',
        'newlegs': 128958,
        'wop': 459.33,
        'incdec': -20.69,
        'initprop': 99,
        'addprop': 10,
        'lowerboundary': 80.09,
        'upperboundary': 120,
        'addpropincdec': -20.69,
    },
    {
        id: 3,
        'area': 'ZRH',
        'newlegs': 567848,
        'wop': 16.33,
        'incdec': -10.69,
        'initprop': 50.56,
        'addprop': 10.02,
        'lowerboundary': 10,
        'upperboundary': 80.99,
        'addpropincdec': -1.77,
    },

]
