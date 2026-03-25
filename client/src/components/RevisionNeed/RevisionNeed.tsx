import {
  Box,
  Typography,
  Alert,
  AlertTitle,
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const RevisionNeed = ({missing} : {missing: string[]}) => {
    return (
        <Alert
            severity="warning"
            icon={<ErrorOutlineIcon fontSize="inherit" />}
            sx={{
                borderRadius: 3,
                bgcolor: '#FFF5EB',
                color: '#2B2F33',
                '& .MuiAlert-icon': { color: '#FF9933' },
                border: '1px solid #FFEDDB',
            }}
            >
            <AlertTitle sx={{ fontWeight: 700 }}>Требуются доработки</AlertTitle>
            <Typography variant="body2" sx={{ mb: 1 }}>
                У объявления не заполнены поля:
            </Typography>
            {/* Список недостающих полей */}
            <Box component="ul" sx={{ pl: 2, m: 0, fontSize: '0.9rem' }}>
                {missing!.map((field: string) => (
                <li key={missing!.indexOf(field)}>{field}</li>
                ))}
            </Box>
        </Alert>
    );
}

export default RevisionNeed;