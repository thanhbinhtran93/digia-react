import React from 'react';
import { SortDirection } from 'interfaces/common';

interface SortConfig<T> {
  key: keyof T;
  direction: SortDirection;
}

export function useSortableData<T>(data: T[], config?: SortConfig<T>) {
  const [sortConfig, setSortConfig] = React.useState(config);

  let sortableItems = React.useMemo(() => {
    const items = [...data];
    if (sortConfig) {
      items.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return items;
  }, [data, sortConfig]);

  const sort = (key: SortConfig<T>['key']) => {
    let direction: SortDirection = 'asc';
    if (key === sortConfig?.key && sortConfig?.direction === 'asc') direction = 'desc';

    setSortConfig({ key, direction });
  };

  return { items: sortableItems, sort, sortConfig };
}
