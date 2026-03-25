import axios from "axios";
import type { FilterType } from "../store/filterStore";
import type { CardType, CardInfoType, FormData } from "../types";

interface CardResponse {
    items: CardType[],
    total: number,
}

const API_URL = 'http://127.0.0.1:8000';

export const getCards = async (start: number = 0, limit: number = 10, filter: FilterType): Promise<CardResponse | undefined> => {
        try {
            const params = {
                limit,
                skip: start * limit,
                q: filter?.q || undefined,
                needRevision: filter?.needRevision ?? undefined,
                categories: filter?.categories && filter.categories.length > 0 
                ? filter.categories.join(','): undefined,
                sortColumn: filter?.sortColumn || undefined,
                sortDirection: filter?.sortDirection || undefined,
            };


            const response = await axios.get(`${API_URL}/items`, {
                params: params,
            });

            return response.data;
        } catch (error) {
            console.error("Ошибка получения данных:", error === null ? '' : error);
        }
}

export const getCardInfo = async (id: string): Promise<CardInfoType | undefined> => {
    try {
            const response = await axios.get(`${API_URL}/items/${id}`);
            return response.data;

    } catch (error) {
            console.error("Ошибка получения данных:", error === null ? '' : error);
    }
}

export const putCardInfo = async (data: FormData, id: string): Promise<void> => {
    try {
            const payload = {
                category: data.category,
                title: data.title,
                price: Number(data.price),
                description: data.description,
                params: data.params,
            };

            await axios.put(`${API_URL}/items/${id}`, payload);

    } catch (error) {
            console.error("Ошибка получения данных:", error === null ? '' : error);
    }
}