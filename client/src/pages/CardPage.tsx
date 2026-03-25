import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  CardMedia,
} from '@mui/material';
import Characteristics from "../components/Characteristics/Characteristics";
import RevisionNeed from "../components/RevisionNeed/RevisionNeed";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { getCardInfo } from "../api/cards";
import type { CardInfoType } from "../types";
import { fieldLabels, categoryRequiredFields } from "../utils/constants";

const CardPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const cardId = params.id;
    const [cardInfo, setCardInfo] = useState<CardInfoType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [missing, setMissing] = useState<string[]>([]);

    useEffect(() => {
        if (!cardId) return;
        setIsLoading(true);
        const load = async () => {
            const data = await getCardInfo(cardId);
            if (data) {
                setCardInfo(data);
                setMissing(fieldsRevision(data));
            }
            setIsLoading(false);
        };
        load();
    }, []);

    const handleBack = () => {
        navigate('/');
    };

    const getDate = (dateISO: string) => {
        const date = new Date(dateISO);
        return format(date, "d MMMM HH:mm", { locale: ru });
    }

    const fieldsRevision = (data: CardInfoType): string[] => {
        const missingFields: string[] = [];

        if (!data.title?.trim()) missingFields.push(fieldLabels.title);
        if (!data.description?.trim()) missingFields.push(fieldLabels.description);
        if (data.price === null || data.price === undefined) missingFields.push(fieldLabels.price);

        const requiredKeys = categoryRequiredFields[data.category];

        if (requiredKeys) {
            requiredKeys.forEach((key) => {
            // Пытаемся достать значение из params
            // Используем any, так как мы динамически обращаемся по ключу
            const value = (data.params as any)?.[key];

            const isEmpty = 
                value === null || 
                value === undefined || 
                (typeof value === 'string' && value.trim() === '');

            if (isEmpty) {
                missingFields.push(fieldLabels[key] || key);
            }
            });
        }

        return missingFields;
    };

    const isShow = !isLoading && cardInfo;

    return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#F8F9FB', minHeight: '100vh' }}>
      
      {/* 2. Шапка страницы */}
      {isShow && <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 3, border: '1px solid #EDEDF0' }}>
        <Grid container spacing={2} alignItems="center">
          
          {/* Левая часть шапки: Кнопка назад и Название */}
          <Grid size={{xs: 12, md: 8}}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <IconButton onClick={handleBack} size="small" sx={{ color: '#001E2F' }}>
                <ArrowBackIcon />
              </IconButton>
              {isShow && <Typography variant="h5" sx={{ fontWeight: 700, color: '#001E2F' }}>
                {cardInfo.title}
              </Typography>}
            </Stack>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              size="small"
              onClick={() => navigate('edit')}
              sx={{
                ml: 5, // Отступ, чтобы выровнять с текстом названия
                textTransform: 'none',
                borderRadius: 2,
                bgcolor: '#007FFF',
                '&:hover': { bgcolor: '#0066CC' },
              }}
            >
              Редактировать
            </Button>
          </Grid>

          {/* Правая часть шапки: Цена и Даты */}
          <Grid size={{xs: 12, md: 4}} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            {isShow && cardInfo.price && <Typography variant="h4" sx={{ fontWeight: 700, color: '#001E2F', mb: 1 }}>
              {cardInfo.price} ₽
            </Typography>}
            <Stack
              spacing={0.5}
              sx={{ color: '#888C94', fontSize: '0.8rem' }}
              alignItems={{ xs: 'flex-start', md: 'flex-end' }}
            >
              {isShow && <Typography variant="caption">Опубликовано: {getDate(cardInfo.createdAt)}</Typography>}
              {isShow && <Typography variant="caption">Отредактировано: {getDate(cardInfo.updatedAt)}</Typography>}
            </Stack>
          </Grid>
        </Grid>
      </Paper>}

      {/* 3. Основной контент */}
      <Grid container spacing={3}>
        
        {/* Левая колонка: Изображение и Описание */}
        <Grid size={{xs: 12, md: 6}}>
          {/* Блок изображения (Заглушка) */}
          <Paper
            elevation={0}
            sx={{
              width: '100%',
              aspectRatio: '4/3', // Сохраняем пропорции как на скрине
              bgcolor: '#F3F4F6',
              borderRadius: 3,
              border: '1px solid #EDEDF0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
            }}
          >
            <CardMedia
                component="img"
                image="/public/cover.jpg"
                alt="cover"
            />
          </Paper>

          { isShow &&
            <>        
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#001E2F', mb: 1.5 }}>
                Описание
            </Typography>
            <Typography variant="body2" sx={{ color: '#2B2F33', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                {cardInfo.description ? cardInfo.description : "Отсутсвует"}
            </Typography>
            </>
          }
        </Grid>

        {/* Правая колонка: Фильтры и Характеристики */}
        <Grid size={{xs: 12, md: 6}}>
          <Stack spacing={3}>
            
            {/* Блок "Требуются доработки" (Условный рендер) */}
            {isShow && cardInfo.needsRevision && (<RevisionNeed missing={missing} />)}

            {/* Блок Характеристик */}
            {isShow && <Characteristics item={cardInfo} />}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CardPage