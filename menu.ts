export const MENU = {
  'Cafe Au Lait': {
    name: 'Cafe Au Lait',
    time: 4000,
  },
  Cappuccino: {
    name: 'Cappuccino',
    time: 10000,
  },
  Expresso: {
    name: 'Expresso',
    time: 15000,
  },
};

export type MenuItem = keyof typeof MENU;
