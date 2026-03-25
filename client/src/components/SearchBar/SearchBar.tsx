import { 
    Box, TextField, ToggleButtonGroup, 
    ToggleButton, MenuItem, IconButton,
 } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import GridViewIcon from '@mui/icons-material/GridView';
import ListIcon from '@mui/icons-material/List';
import { filterStore } from "../../store/filterStore";
import { useRef } from "react";

const SearchBar = () => {
    const { setFilter, setPage } = filterStore();
    const input = useRef<HTMLInputElement>(null);

    const handleColumn = (value: string) => {
        if (value == "new") {
            setFilter({sortColumn: "createdAt", sortDirection: "desc"});
        } else if (value === "old") {
            setFilter({sortColumn: "createdAt", sortDirection: "asc"});

        } else if (value === "start") {
            setFilter({sortColumn: "title", sortDirection: "asc"});
        } else if (value === "end") {
            setFilter({sortColumn: "title", sortDirection: "desc"});
        }

        setPage(1);
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: "0.75rem", bgcolor: 'var(--background-wt)', borderRadius: 2, mb: "1rem" }}>
            <TextField 
                fullWidth 
                placeholder="Найти объявление..." 
                size="small"
                slotProps={{
                    input: {
                        endAdornment: <IconButton
                        aria-label='Искать'
                        onClick={() => setFilter({ q: input.current?.value})}
                        edge="end"
                        >
                        <SearchIcon/>
                        </IconButton>,
                    sx: {
                        background: "#f6f6f8",
                    border: "none",
                    borderRadius: "0.5rem"
                    },
                },
                }}
                inputRef={input}
            />
            
            <ToggleButtonGroup value="grid" exclusive size="small">
                <ToggleButton value="grid"><GridViewIcon /></ToggleButton>
                <ToggleButton value="list"><ListIcon /></ToggleButton>
            </ToggleButtonGroup>

            <TextField select size="small" defaultValue="new" onChange={(e) => handleColumn(e.target.value)} sx={{ minWidth: 200 }}>
                <MenuItem value="new">По новизне (сначала новые)</MenuItem>
                <MenuItem value="old">По новизне (сначала старые)</MenuItem>
                <MenuItem value="start">По названию (А → Я)</MenuItem>                
                <MenuItem value="end">По названию (Я → А)</MenuItem>
            </TextField>
        </Box>
    );
}

export default SearchBar;