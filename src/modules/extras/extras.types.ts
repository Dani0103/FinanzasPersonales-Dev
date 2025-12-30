export type Period = {
    id: number;
    date_from: string;
    date_to: string;
    label: string | null;
};

export type Extra = {
    id: number;
    period_id: number | null;
    received_on: string;
    description: string;
    amount: number;
    notes: string | null;
};

export const money = (n: number) => n.toLocaleString("es-CO");
