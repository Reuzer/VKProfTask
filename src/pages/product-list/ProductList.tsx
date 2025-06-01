import { Table, Spin } from "antd";
import styles from './ProductList.module.css';
import { useFetch } from "../../hooks/useFetch";
import ServiceApi from "../../api/ServiceApi";
import { useEffect, useState, useRef, useCallback } from "react";
import type { GetProduct } from "../../api/types";

const PAGE_SIZE = 20;

const ProductList = () => {
    const [products, setProducts] = useState<GetProduct[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const tableRef = useRef<HTMLDivElement>(null);

    const { fetching } = useFetch(async () => {
        setLoading(true);
        const response = await ServiceApi.getProducts(PAGE_SIZE, page);
        
        if (response.status === 200) {
            const newProducts = response.data;
            setProducts(prev => [...prev, ...newProducts]);
            setHasMore(newProducts.length === PAGE_SIZE);
        }
        setLoading(false);
    });

    const handleScroll = useCallback(() => {
        if (!tableRef.current || loading || !hasMore) return;
        
        const { scrollTop, clientHeight, scrollHeight } = tableRef.current;
        const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 50;
        
        if (isNearBottom) {
            setPage(prev => prev + 1);
        }
    }, [loading, hasMore]);

    // Загрузка первой страницы
    useEffect(() => {
        fetching();
    }, [page]);

    useEffect(() => {
        const tableElement = tableRef.current;
        if (tableElement) {
            tableElement.addEventListener('scroll', handleScroll);
            return () => tableElement.removeEventListener('scroll', handleScroll);
        }
    }, [handleScroll]);

    const columns = [
        {
            title: 'Имя товара',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Изготовитель',
            dataIndex: 'factory',
            key: 'factory',
        },
        {
            title: 'Цена',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => `${price} ₽`,
        },
        {
            title: 'Категория',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Количество',
            dataIndex: 'quantity',
            key: 'quantity',
        },
    ];

    return (
        <div 
            ref={tableRef}
            className={styles.tableContainer}
            style={{ height: '500px', overflowY: 'auto' }}
        >
            <Table<GetProduct>
                className={styles.table}
                columns={columns}
                dataSource={products}
                rowKey="id"
                pagination={false}
                loading={loading}
                scroll={{ y: undefined }} 
            />
            
            {loading && (
                <div className={styles.loadingContainer}>
                    <Spin tip="Загрузка..." />
                </div>
            )}
            
            {!hasMore && products.length > 0 && (
                <div className={styles.endMessage}>Все товары загружены</div>
            )}
        </div>
    );
};

export default ProductList;