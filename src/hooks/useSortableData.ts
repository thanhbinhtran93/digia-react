import React from 'react';

interface SortConfig<T = any> {
  sortedKey: keyof T;
  isSortedDesc?: boolean;
  sortFunc?: (a: T, b: T) => number;
}

export function useSortableData<T>(data: T[], defaultConfig?: SortConfig<T>) {
  const [currentSortConfig, setCurrentSortConfig] = React.useState<
    SortConfig<T> | undefined
  >(defaultConfig);

  const sortedKey = currentSortConfig?.sortedKey;

  const defaultSortFunc = React.useCallback(
    (a, b) => {
      if (a[sortedKey] < b[sortedKey]) {
        return -1;
      }
      if (a[sortedKey] > b[sortedKey]) {
        return 1;
      }
      return 0;
    },
    [sortedKey],
  );

  const sortFunc = currentSortConfig?.sortFunc
    ? currentSortConfig.sortFunc
    : defaultSortFunc;

  const sortableItems = React.useMemo(() => {
    const items = [...data];
    if (currentSortConfig) {
      items.sort(sortFunc);
      if (currentSortConfig.isSortedDesc) {
        items.reverse();
      }
    }

    return items;
  }, [currentSortConfig, data, sortFunc]);

  const sort = (config: Omit<SortConfig<T>, 'isSortedDesc'>) => {
    // if the same key, reverse the order, otherwise SortedDesc is false
    const isSortedDesc =
      config.sortedKey === currentSortConfig?.sortedKey
        ? !currentSortConfig.isSortedDesc
        : false;

    setCurrentSortConfig({
      sortedKey: config.sortedKey,
      isSortedDesc,
      sortFunc: config.sortFunc,
    });
  };

  return {
    items: sortableItems,
    sort,
    isSortedDesc: currentSortConfig?.isSortedDesc,
    currentSortedKey: currentSortConfig?.sortedKey,
  };
}
