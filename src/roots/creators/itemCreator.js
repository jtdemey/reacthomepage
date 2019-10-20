import { itemMetadataConstants } from '../app/surviveConstants';

export const createItem = (name, amt) => {
  const metaCheck = m => {
    if(m.length !== 1) {
      console.log(`Error in createItem: no item metadata found for ${name}`);
    }
    return;
  };
  switch(name) {
    case 'handwarmers':
      const meta = itemMetadataConstants.filter(i => i.name === name);
      metaCheck(meta);
      return {
        ...meta[0],
        amount: amt
      };
    default:
      console.log(`Error in createItem: item name ${name} not recognized.`);
      break;
  }
};

export const addItem = (locale, item) => {
  let stuff = Object.assign([], locale.items);
  if(stuff.some(i => i.itemId === item.itemId)) {
    stuff[q].count += item.count;
  } else {
    stuff.push(item);
  }
  return {
    ...locale,
    items: stuff
  };
};
