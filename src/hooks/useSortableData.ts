import React from 'react';

interface SortConfig<T = any> {
  sortedKey?: keyof T;
  isSortedDesc?: boolean;
}
const sortByKey = (sortedKey?: any, isSortedDesc = false) => (a: any, b: any) => {
  if (!sortedKey) {
    return 0;
  }
  if (a[sortedKey] < b[sortedKey]) {
    return isSortedDesc ? 1 : -1;
  }
  if (a[sortedKey] > b[sortedKey]) {
    return isSortedDesc ? -1 : 1;
  }
  return 0;
};

export function useSortableData<T>(
  data: T[],
  sortFunc: (key?: keyof T, isSortedDesc?: boolean) => (a: T, b: T) => number = sortByKey,
) {
  const [currentSortConfig, setCurrentSortConfig] = React.useState<SortConfig<T>>({
    sortedKey: undefined,
    isSortedDesc: false,
  });

  const { sortedKey, isSortedDesc } = currentSortConfig;

  const sortableItems = React.useMemo(() => {
    const items = [...data];
    items.sort(sortFunc(sortedKey, isSortedDesc));
    return items;
  }, [data, isSortedDesc, sortFunc, sortedKey]);

  const sort = (config: Omit<SortConfig<T>, 'isSortedDesc'>) => {
    // if the same key, reverse the order, otherwise SortedDesc is false
    const isSortedDesc = config.sortedKey === currentSortConfig?.sortedKey ? !currentSortConfig.isSortedDesc : false;

    setCurrentSortConfig({
      sortedKey: config.sortedKey,
      isSortedDesc,
    });
  };

  return {
    items: sortableItems,
    sort,
    isSortedDesc: currentSortConfig?.isSortedDesc,
    currentSortedKey: currentSortConfig?.sortedKey,
  };
}
