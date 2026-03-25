import { create } from "zustand";

export type CategoryValue = "auto" | "real_estate" | "electronics";

export type FilterType = {
    q: string | null;
    needRevision: boolean | null;
    categories: CategoryValue[];
    sortColumn: "title" | "createdAt" | null;
    sortDirection: "asc" | "desc" | null
};

interface FilterState {
    filter: FilterType;
    page: number;
    setFilter: (newFilter: Partial<FilterType>) => void;
    setPage: (page: number) => void;
    setCategories: (value: CategoryValue) => void;
    resetFilter: () => void;
};

const initialFilter: FilterType = {
    q: '',
    needRevision: false,
    categories: [],
    sortColumn: "createdAt",
    sortDirection: "desc"
};

export const filterStore = create<FilterState>((set) => ({
    filter: initialFilter,
    page: 0,
    setFilter: (newFilter) => set((state) => ({
        filter: {...state.filter, ...newFilter},
        page: 0
    })),
    setPage: (page) => set({page}),
    setCategories: (value: CategoryValue) => set((state) => {
        const current = state.filter.categories;
        const next = current.includes(value)
            ? current.filter(c => c !== value)
            : [...current, value];
        
        return { 
            filter: { ...state.filter, categories: next },
            page: 0 
        };
    }),
    resetFilter: () => set({filter: initialFilter, page: 0}),
}))
