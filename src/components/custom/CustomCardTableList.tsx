import { ReactNode } from "react";

export interface CustomCardTableListColumns<T> {
  key: keyof T;
  headerName: string;
  render?: (item: T) => ReactNode;
}

interface Props<T extends object> {
  columns: CustomCardTableListColumns<T>[];
  data: T[];
  loading?: boolean;
}

const CustomCardTableList = <T extends object>({ columns, data, loading }: Props<T>) => {
  const loadingComponent = () => {
    return (
      <tr>
        <td colSpan={columns.length} className="px-6 py-10">
        </td>
        <td>
          <div className="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="animate-spin inline-block size-8 border-[3px] border-current border-t-transparent text-gray-800 rounded-full">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </td>
      </tr>
    )
  };

  const emptyComponent = () => {
    return (
      <tr>
        <td colSpan={columns.length} className="px-6 py-4 text-center text-sm font-medium text-gray-800">
          No data available
        </td>
      </tr>
    )
  };

  return (
    <div className="flex flex-col bg-white">
      <div className="overflow-x-auto py-5 px-8">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  {columns.map((column, columnIndex) => (
                    <th key={columnIndex} scope="col" className={`px-6 py-3 text-start text-sm font-bold text-gray-400 uppercase ${columnIndex === 0 && 'pl-0'}`}>
                      {column?.headerName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="relative divide-y divide-gray-200">
                {loading ? (
                  loadingComponent()
                ) : data?.length > 0 ? data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {columns.map((column, columnIndex) => (
                      <td key={columnIndex} className={`px-6 py-4 whitespace-nowrap text-sm text-gray-400 ${columnIndex === 0 && 'pl-0'}`}>
                        {column?.render ? column?.render(row) as ReactNode : row[column?.key] as string}
                      </td>
                    ))}
                  </tr>
                )) : (
                  emptyComponent()
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomCardTableList;
