import { ReactNode } from 'react';
import { SearchX } from 'lucide-react';

interface EmptyStateProps {
    title: string;
    description: string;
    icon?: ReactNode;
    action?: ReactNode;
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
    return (
        <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-border bg-secondary/10 px-6 py-24 text-center">
            <div
                data-testid="empty-icon"
                className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/30 text-muted-foreground">
                {icon || <SearchX size={28} strokeWidth={1.25} />}
            </div>
            <h3 className="mt-6 text-lg font-semibold tracking-tight text-foreground">
                {title}
            </h3>
            <p className="mt-2 max-w-70 text-sm leading-relaxed text-muted-foreground sm:max-w-lg">
                {description}
            </p>
            {action && (
                <div className="mt-8">
                    {action}
                </div>
            )}
        </div>
    );
}