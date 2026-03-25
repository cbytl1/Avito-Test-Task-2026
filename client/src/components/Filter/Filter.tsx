import { filterStore } from "../../store/filterStore";
import type { CategoryValue } from "../../store/filterStore";
import { 
    Typography, Box,
    Paper, Accordion, AccordionSummary, AccordionDetails,
    FormGroup, FormControlLabel, Checkbox, Switch,
    Button
 } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Filter = () => {
    const {setCategories, setFilter, resetFilter} = filterStore();

    const handleCheck = (val: CategoryValue) => {
        setCategories(val);
    };

    return (
        <Paper sx={{ p: 2, width: 280, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Фильтры</Typography>
            
            <Accordion disableGutters elevation={0} defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Категория</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <FormGroup>
                    <FormControlLabel 
            control={<Checkbox onChange={() => handleCheck("auto")} />} 
            label="Авто" 
          />
          <FormControlLabel 
            control={<Checkbox onChange={() => handleCheck("electronics")} />} 
            label="Электроника" 
          />
          <FormControlLabel 
            control={<Checkbox onChange={() => handleCheck("real_estate")} />} 
            label="Недвижимость" 
          />
                </FormGroup>
                </AccordionDetails>
            </Accordion>

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">Только требующие доработок</Typography>
                <Switch onChange={(e) => setFilter({needRevision: e.target.checked})} />
            </Box>

            <Button fullWidth variant="outlined" sx={{ mt: 3, borderRadius: 2 }} onClick={() => resetFilter()}>
                Сбросить фильтры
            </Button>
        </Paper>
    );
}

export default Filter;