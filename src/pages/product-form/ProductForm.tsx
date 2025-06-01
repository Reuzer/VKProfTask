import Input from "antd/es/input/Input";
import styles from './ProductForm.module.css';
import { useState } from "react";
import type { PostProduct } from "../../api/types";
import { Button, Select, } from "antd";
import { useFetch } from "../../hooks/useFetch";
import ServiceApi from "../../api/ServiceApi";

const ProductForm = () => {
    const { fetching, isLoading, error } = useFetch(async () => {
        const response = await ServiceApi.postProduct(formData)
        if (response.status === 200) {
            return response
        }
    });

    const options = [
        { value: 'Бакалея', label: 'Бакалея' },
        { value: 'Напитки', label: 'Напитки' },
        { value: 'Сладости', label: 'Сладости' },
        { value: 'Овощи и фрукты', label: 'Овощи и фрукты' },
        { value: 'Снеки', label: 'Снеки' },
    ]

    const [formData, setFormData] = useState<PostProduct>({
        name: '',
        factory: '',
        price: 0,
        category: '',
        quantity: 0,
    });

    const [errors, setErrors] = useState({
        name: '',
        factory: '',
        price: '',
        category: '',
        quantity: ''
    });

    const validateForm = () => {
        const newErrors = {
            name: '',
            factory: '',
            price: '',
            category: '',
            quantity: ''
        };

        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = 'Пожалуйста, введите название товара';
            isValid = false;
        }

        if (!formData.factory.trim()) {
            newErrors.factory = 'Пожалуйста, укажите производителя';
            isValid = false;
        }

        if (formData.price <= 0) {
            newErrors.price = 'Цена должна быть больше 0';
            isValid = false;
        }

        if (!formData.category) {
            newErrors.category = 'Пожалуйста, выберите категорию';
            isValid = false;
        }

        if (formData.quantity <= 0) {
            newErrors.quantity = 'Количество должно быть больше 0';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            fetching();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'price' || name === 'quantity' ? Number(value) : value
        });
       
        setErrors({ ...errors, [name]: '' });
    };

    return (
        <div className={styles.product_form_container}>
            <form className={styles.product_form}>
                <div className={styles.form_item}>
                    <label htmlFor="name">Введите имя</label>
                    <Input
                        className={styles.inputData}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        status={errors.name ? 'error' : ''}
                    />
                    {errors.name && <div className={styles.error_message}>{errors.name}</div>}
                </div>

                <div className={styles.form_item}>
                    <label htmlFor="factory">Изготовитель</label>
                    <Input
                        className={styles.inputData}
                        name="factory"
                        value={formData.factory}
                        onChange={handleChange}
                        status={errors.factory ? 'error' : ''}
                    />
                    {errors.factory && <div className={styles.error_message}>{errors.factory}</div>}
                </div>

                <div className={styles.form_item}>
                    <label htmlFor="price">Цена</label>
                    <Input
                        className={styles.inputData}
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        status={errors.price ? 'error' : ''}
                    />
                    {errors.price && <div className={styles.error_message}>{errors.price}</div>}
                </div>

                <div className={styles.form_item}>
                    <label htmlFor="category">Выберите категорию</label>
                    <Select
                        options={options}
                        className={styles.select}
                        value={formData.category}
                        onChange={(value) => {
                            setFormData({ ...formData, category: value });
                            setErrors({ ...errors, category: '' });
                        }}
                        status={errors.category ? 'error' : ''}
                    />
                    {errors.category && <div className={styles.error_message}>{errors.category}</div>}
                </div>

                <div className={styles.form_item}>
                    <label htmlFor="quantity">Количество товара</label>
                    <Input
                        className={styles.inputData}
                        name="quantity"
                        type="number"
                        value={formData.quantity}
                        onChange={handleChange}
                        status={errors.quantity ? 'error' : ''}
                    />
                    {errors.quantity && <div className={styles.error_message}>{errors.quantity}</div>}
                </div>

                <Button 
                    className={styles.submit_btn} 
                    onClick={handleSubmit}
                    loading={isLoading}
                >
                    Создать
                </Button>
            </form>
        </div>
    );
};

export default ProductForm;