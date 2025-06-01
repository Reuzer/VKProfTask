import { Table } from 'antd';
import styles from './App.module.css';


function App() {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Имя товара',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Изготовитель',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'Категория',
      dataIndex: 'category',
      key: 'category'
    },
    {
      title: 'Количество товара',
      dataIndex: 'quantity',
      key: 'quantity'
    }
  ]


  return (
    <>
      <Table className={styles.table} columns={columns}/>
    </>
  )
}

export default App

/* 
id
name
factory
price
category
quantity
antd
*/