import { getCards } from "../api/cards";
import { filterStore } from "../store/filterStore";
import { 
    Typography, Box, Pagination
 } from "@mui/material";
import ProductCard from '../components/ProductCard/ProductCard';
import Header from '../components/Header/Header';
import SearchBar from '../components/SearchBar/SearchBar';
import Filter from '../components/Filter/Filter';
import { useEffect, useState } from 'react';
import type { CardType } from "../types";

interface CardResponse {
    items: CardType[],
    total: number,
}

const Dashboard = () => {
    const [cards, setCards] = useState<CardResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { filter, page, setPage } = filterStore();

    useEffect(() => {
        setIsLoading(true);
        const load = async () => {
            const data = await getCards(page, 10, filter);
            if (data) {
                setCards(data);
            }
            setIsLoading(false);
        };
        load();
    }, [filter, page]);

    return (
        <>
        <Header isLoading={isLoading} total={cards ? cards.total : 0} />
        <SearchBar />
        <Box sx={{display: "flex", gap: "1.5rem", alignItems: "flex-start", width: "100%"}}>
            <Filter />
            <Box>
                {isLoading ? (<Typography >Грузится бро..</Typography>) : (
                    <Box sx={{display: "flex", gap: "0.75rem", flexWrap: "wrap"}}>
                        {
                            cards!.total === 0 ? (
                                <Typography >Объявлений нет...</Typography>
                            )
                            :
                            (
                                <>
                                    {cards!.items.map((item: CardType) => (
                                        <ProductCard key={item.id} card={item} />
                                    ))}
                                </>
                            )
                        }
                    </Box>
                )}

                <Pagination count={cards ? Math.ceil(cards.total/10) : 1} sx={{display: "block"}} variant="outlined" shape="rounded" onChange={(_, value) => setPage(value-1)} />
            </Box>
        </Box>
        </>
    )
}

export default Dashboard;