export type Account = { id: number; name: string };
export type Period = { id: number; date_from: string; date_to: string; label: string | null };

export type Movement = {
    id: number;
    account_id: number;
    period_id: number | null;
    kind_id: number;
    status_id: number;
    description: string;
    notes: string | null;
    amount: number;
    movement_date: string;
    created_at: string;
};

// Ajusta IDs si los tuyos son distintos
export const KIND = [
    { id: 1, label: "Gasto" },
    { id: 2, label: "Ahorro" },
] as const;

export const STATUS = [
    { id: 1, label: "Pendiente" },
    { id: 2, label: "Debo" },
    { id: 3, label: "Pagado" },
] as const;
