import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductCard } from '@/components/product-card';

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
        return <img {...props} />;
    },
}));

const mockProduct = {
    id: 1,
    title: 'iPhone 13',
    description: 'Latest Apple smartphone',
    price: 999,
    rating: 4.5,
    category: 'smartphones',
    thumbnail: '/iphone.jpg',
};

describe('ProductCard', () => {
    it('renders product title and price', () => {
        render(<ProductCard product={mockProduct} />);

        expect(screen.getByText('iPhone 13')).toBeInTheDocument();

        expect(
            screen.getByText((content) =>
                content.replace(/\s/g, '') === '$999.00'
            )
        ).toBeInTheDocument();
    });

    it('renders product image with correct alt', () => {
        render(<ProductCard product={mockProduct} />);

        const image = screen.getByAltText('iPhone 13');
        expect(image).toBeInTheDocument();
    });
});