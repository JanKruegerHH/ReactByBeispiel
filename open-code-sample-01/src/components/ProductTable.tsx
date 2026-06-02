import React, { useState } from 'react';

interface Product {
    name: string;
    price: number;
    inStock: boolean;
    category: string;
}

const PRODUCTS: Product[] = [
    { name: 'Apple', price: 1, inStock: true, category: 'Fruits' },
    { name: 'Dragonfruit', price: 1, inStock: true, category: 'Fruits' },
    { name: 'Passionfruit', price: 2, inStock: false, category: 'Fruits' },
    { name: 'Spinach', price: 2, inStock: true, category: 'Vegetables' },
    { name: 'Pumpkin', price: 4, inStock: false, category: 'Vegetables' },
    { name: 'Peas', price: 1, inStock: true, category: 'Vegetables' },
];

const CATEGORIES = Array.from(new Set(PRODUCTS.map(p => p.category)));

export default function ProductTable() {
    const [search, setSearch] = useState('');
    const [onlyInStock, setOnlyInStock] = useState(false);

    const filtered = PRODUCTS.filter(p => {
        if (onlyInStock && !p.inStock) return false;
        if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });

    return (
        <div style={{ fontFamily: 'sans-serif', maxWidth: 300, margin: '20px auto' }}>
            <input
                type="text"
                placeholder="Search…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                    width: '100%',
                    padding: '6px 8px',
                    marginBottom: 8,
                    boxSizing: 'border-box',
                    border: '1px solid #ccc',
                }}
            />
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={e => setOnlyInStock(e.target.checked)}
                />
                Only show products in stock
            </label>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'left', paddingBottom: 4 }}>Name</th>
                        <th style={{ textAlign: 'right', paddingBottom: 4 }}>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {CATEGORIES.map(category => {
                        const items = filtered.filter(p => p.category === category);
                        if (items.length === 0) return null;
                        return (
                            <React.Fragment key={category}>
                                <tr>
                                    <td colSpan={2} style={{ fontWeight: 'bold', paddingTop: 10, paddingBottom: 2 }}>
                                        {category}
                                    </td>
                                </tr>
                                {items.map(p => (
                                    <tr key={p.name} style={{ color: p.inStock ? 'black' : 'red' }}>
                                        <td>{p.name}</td>
                                        <td style={{ textAlign: 'right' }}>${p.price}</td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
