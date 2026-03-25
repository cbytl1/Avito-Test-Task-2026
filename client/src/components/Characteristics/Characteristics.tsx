import React from 'react';
import { Paper, Typography, Stack, Grid } from '@mui/material';
import type { CardInfoType } from '../../types';
import { fieldLabels } from '../../utils/constants';

// Функция для красивого отображения значений (например, 'automatic' -> 'Автомат')
const formatValue = (key: string, value: any) => {
  if (value === 'automatic') return 'Автомат';
  if (value === 'manual') return 'Механика';
  if (value === 'new') return 'Новое';
  if (value === 'used') return 'Б/У';
  if (key === 'mileage') return `${value.toLocaleString()} км`;
  if (key === 'area') return `${value} м²`;
  return value;
};

const Characteristics = ({ item }: { item: CardInfoType }) => {
  // Превращаем объект params в массив [ключ, значение], фильтруя пустые поля
  const paramsEntries = Object.entries(item.params || {}).filter(
    ([_, value]) => value !== null && value !== undefined && value !== ''
  );

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #EDEDF0' }}>
      <Typography variant="h6" sx={{ fontWeight: 700, color: '#001E2F', mb: 2 }}>
        Характеристики
      </Typography>
      
      <Stack spacing={1.5}>
        {paramsEntries.length > 0 ? (
          paramsEntries.map(([key, value]) => (
            <React.Fragment key={key}>
              <Grid container spacing={1}>
                <Grid size={{ xs: 5, sm: 4 }}>
                  <Typography variant="body2" sx={{ color: '#888C94' }}>
                    {fieldLabels[key] || key}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 7, sm: 8 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: '#2B2F33' }}>
                    {formatValue(key, value)}
                  </Typography>
                </Grid>
              </Grid>
            </React.Fragment>
          ))
        ) : (
          <Typography variant="body2" sx={{ color: '#888C94', fontStyle: 'italic' }}>
            Характеристики не указаны
          </Typography>
        )}
      </Stack>
    </Paper>
  );
};

export default Characteristics;