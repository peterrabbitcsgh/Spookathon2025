// Question categories for organization
export const categories = {
  POWER_RULE: {
    id: 'power_rule',
    name: 'Power Rule',
    icon: '⚡',
    color: 'bg-yellow-500'
  },
  TRIG: {
    id: 'trig',
    name: 'Trigonometry',
    icon: '📐',
    color: 'bg-blue-500'
  },
  EXPONENTIAL: {
    id: 'exponential',
    name: 'Exponential & Log',
    icon: '📈',
    color: 'bg-green-500'
  },
  CHAIN_RULE: {
    id: 'chain_rule',
    name: 'Chain Rule',
    icon: '🔗',
    color: 'bg-purple-500'
  },
  PRODUCT_RULE: {
    id: 'product_rule',
    name: 'Product Rule',
    icon: '✖️',
    color: 'bg-red-500'
  }
};

export const getCategoryById = (id) => {
  return Object.values(categories).find(cat => cat.id === id);
};

export default categories;
