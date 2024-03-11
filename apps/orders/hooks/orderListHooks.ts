import { useRef, useState } from "react";

export const useTableScroll = () => {
    const tableHeader = useRef<HTMLTableSectionElement>(null);
	const filterList = useRef<HTMLDivElement>(null);
	const tableHeaderPlaceholder = useRef<HTMLDivElement>(null);
    
    const onScroll = () => {
		if (!filterList.current || !tableHeader.current || !tableHeaderPlaceholder.current) {
			return;
		}
		const filterPosition = filterList.current.getBoundingClientRect();
		const tableHeaderPosition = tableHeader.current.getBoundingClientRect();
		const tableMinHeaderPosition = filterPosition.top + filterPosition.height;
		const isAbsolute = tableHeaderPosition.top < tableMinHeaderPosition;
        // 滚动后，table header到filter的距离
        const tableHeaderToFilterPX = 10;

		// 计算table header的位置, 使其在filter下方
		const headerRow: HTMLTableRowElement = tableHeader.current.children[0] as HTMLTableRowElement;
		headerRow.style.position = isAbsolute ? 'sticky' : 'static';
        // header的位置根据计算后+10，与上方filter留出10的距离
		headerRow.style.top = isAbsolute ? `${filterPosition.top + filterPosition.height - tableHeaderPosition.top + tableHeaderToFilterPX}px` : '0';

		// 计算table header placeholder的高度, 使其占位，挡在table header底部，用于遮住table header的border radius
		const headerPlaceholder = tableHeaderPlaceholder.current;
		const headerRowPosition = headerRow.getBoundingClientRect();
        // 由于header留出来的10px的距离，所以plasholder的高度需要+10,用来盖住下方滚动内容
		headerPlaceholder.style.height = isAbsolute ? `${headerRowPosition.height + tableHeaderToFilterPX}px` : '0';
		headerPlaceholder.style.display = isAbsolute ? 'block' : 'none';
		headerPlaceholder.style.top = isAbsolute ? `${filterPosition.height}px` : '0';

        // 由于table tr不可以添加border，需要滚动时对th添加border
        const headerCells = headerRow.children;
        for (let i = 0; i < headerCells.length; i++) {
            const cell = headerCells[i] as HTMLTableCellElement;
            cell.style.borderTop = isAbsolute ? '1px solid var(--TableCell-borderColor)' : 'none';
            if (i === 0) {
                cell.style.borderLeft = isAbsolute ? '1px solid var(--TableCell-borderColor)' : 'none';
                cell.style.borderTopLeftRadius = isAbsolute ? 'var(--TableCell-borderRadius)' : '0';
            }

            if (i === headerCells.length - 1) {
                cell.style.borderRight = isAbsolute ? '1px solid var(--TableCell-borderColor)' : 'none';
                cell.style.borderTopRightRadius = isAbsolute ? 'var(--TableCell-borderRadius)' : '0';
            }
        }
	};

    return {
        tableHeader,
        filterList,
        tableHeaderPlaceholder,
        onScroll
    }
};

export const usePagination = (total: number, current: number) => {
    const [currentPage, setCurrentPage] = useState(current);
	const [totalPage, setTotalPage] = useState(total);

    return {
        currentPage,
        setCurrentPage,
        totalPage,
        setTotalPage
    }
};

export const useOrderListContextState = (key: string) => {
    const [context, setContext] = useState<any>({});

    return {
        key,
        context,
        setContext
    }
}

export const useOrderListStateFromContext = (context: any) => {
    const [currentPage, setCurrentPage] = useState(context.currentPage || 1);
    //todo 这个将被剔除 总页面将在Paging里面进行计算
	  const [totalPage, setTotalPage] = useState(context.totalPage || 10);
    const [total, setTotal] = useState(context.total || 0);
    const [pageSize, setPageSize] = useState(context.pageSize || 10);
    return {
        currentPage,
        setCurrentPage,
        totalPage,
        setTotalPage,
        pageSize,
        setPageSize,
        total,
        setTotal
    }
};

export const useOngoingTabContent = (context: any) => {
    const [querySubStatus, setQuerySubStatus] = useState(context.querySubStatus || 'default');
    const [createdBy, setCreatedBy] = useState(context.createdBy || 'default');
    const [createDate, setCreateDate] = useState<string | string[]>(context.createDate || 'default');
    const [createdByList, setCreatedByList] = useState(context.createdByList || []);

    return {
        querySubStatus, setQuerySubStatus,
        createdBy, setCreatedBy,
        createDate, setCreateDate,
        createdByList, setCreatedByList
    }
};

export const useCompletedTabContent = (context: any) => {
    const [queryOrderType, setQueryOrderType] = useState(context.queryOrderType || 'default');
    const [createDate, setCreateDate] = useState<string | string[]>(context.createDate || 'default');
    const [createdBy, setCreatedBy] = useState(context.createdBy || 'default');
    const [checkoutBy, setCheckoutBy] = useState(context.checkoutBy || 'default');
    const [createdByList, setCreatedByList] = useState(context.createdByList || []);
    const [checkoutByList, setCheckoutByList] = useState(context.checkoutByList || []);

    return {
        queryOrderType, setQueryOrderType,
        createDate, setCreateDate,
        createdBy, setCreatedBy,
        checkoutBy, setCheckoutBy,
        createdByList, setCreatedByList,
        checkoutByList, setCheckoutByList
    }
};

export const useCanceledTabContent = (context: any) => {
    const [orderType, setOrderType] = useState(context.orderType || 'default');
    const [querySubStatus, setQuerySubStatus] = useState(context.querySubStatus || 'default');
    const [createDate, setCreateDate] = useState<string | string[]>(context.createDate || 'default');
    const [cancelBy, setCancelBy] = useState(context.cancelBy || 'default');
    const [cancelByList, setCancelByList] = useState(context.cancelByList || []);

    return {
        orderType, setOrderType,
        querySubStatus, setQuerySubStatus,
        createDate, setCreateDate,
        cancelBy, setCancelBy,
        cancelByList, setCancelByList
    }
};
