import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EmptyState } from '@/components/EmptyState';

describe('EmptyState', () => {
    it('renders title and description', () => {
        render(
            <EmptyState
                title="No results found"
                description="Try adjusting your search filters"
            />
        );

        expect(screen.getByText('No results found')).toBeInTheDocument();
        expect(
            screen.getByText('Try adjusting your search filters')
        ).toBeInTheDocument();
    });

    it('renders action when provided', () => {
        render(
            <EmptyState
                title="Nothing here"
                description="Please try again"
                action={<button>Retry</button>}
            />
        );

        expect(screen.getByText('Retry')).toBeInTheDocument();
    });

    it('renders default icon when no icon is provided', () => {
        render(
            <EmptyState
                title="Empty"
                description="No data available"
            />
        );

        expect(screen.getByTestId('empty-icon')).toBeInTheDocument();
    });
});