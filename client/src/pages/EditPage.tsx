import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCardInfo, putCardInfo } from '../api/cards';
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Stack,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
  Paper,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import type { FormData } from '../types';
import { CATEGORIES } from '../utils/constants';
import CharacteristicsEdit from '../components/CharacteristicsEdit/CharacteristicsEdit';

const INITIAL_DATA: FormData = {
  category: '',
  title: '',
  price: '',
  description: '',
  params: {},
};

const EditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Стейты данных
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [notification, setNotification] = useState<{ open: boolean; type: 'success' | 'error'; message: string }>({
    open: false, type: 'success', message: ''
  });

  const draftKey = `draft_item_${id}`;

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const savedDraft = localStorage.getItem(draftKey);
        if (savedDraft) {
          setFormData(JSON.parse(savedDraft));
          setIsLoading(false);
          return;
        }

        const data = await getCardInfo(id!);
        if (data) {
            setFormData({
              category: data.category || '',
              title: data.title || '',
              price: data.price ? String(data.price) : '',
              description: data.description || '',
              params: data.params || {},
            });
        }
      } catch (error) {
        showNotification('error', 'Не удалось загрузить данные объявления');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) loadData();
  }, [id]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(draftKey, JSON.stringify(formData));
    }
  }, [formData, isLoading]);

  // --- 3. ОБРАБОТЧИКИ ИЗМЕНЕНИЙ ---
  const handleParamChange = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      params: { ...prev.params, [key]: value },
    }));
  };

  const handleChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };

      if (field === 'category' && prev.category !== value) {
        newData.params = {};
      }
      return newData;
    });
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleClear = (field: keyof FormData) => {
    handleChange(field, '');
  };

  // --- 4. ВАЛИДАЦИЯ И ОТПРАВКА ---
  const isTitleError = touched.title && !formData.title.trim();
  const isPriceError = touched.price && (!formData.price || isNaN(Number(formData.price)));
  const isFormValid = formData.title.trim() && formData.price && !isNaN(Number(formData.price)) && formData.category;

  const handleSubmit = async () => {
    // Помечаем все обязательные поля как тронутые
    setTouched({ title: true, price: true, category: true });

    if (!isFormValid) return;

    try {
      await putCardInfo(formData, id!);

      localStorage.removeItem(draftKey);
      showNotification('success', 'Изменения сохранены');
      
    } catch (error) {
      showNotification('error', 'Ошибка сохранения. Попробуйте ещё раз или зайдите позже.');
    }
  };

  const handleCancel = () => {
    localStorage.removeItem(draftKey); // Отменяем черновик
    navigate(`/item/${id}`);
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ open: true, type, message });
  };

  if (isLoading) return <Typography sx={{ p: 4 }}>Загрузка редактора...</Typography>;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
        Редактирование объявления
      </Typography>

      <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, border: '1px solid #E0E0E0', borderRadius: 3 }}>
        <Stack spacing={4}>
          
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>Категория *</Typography>
            <TextField
              select
              fullWidth
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              error={touched.category && !formData.category}
              onBlur={() => handleBlur('category')}
            >
              {CATEGORIES.map((cat) => (
                <MenuItem key={cat.value} value={cat.value}>{cat.label}</MenuItem>
              ))}
            </TextField>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: isTitleError ? 'error.main' : 'text.primary' }}>
              Название *
            </Typography>
            <TextField
              fullWidth
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              onBlur={() => handleBlur('title')}
              error={isTitleError}
              helperText={isTitleError ? 'Название должно быть заполнено' : ''}
              InputProps={{
                endAdornment: formData.title && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => handleClear('title')}><ClearIcon fontSize="small" /></IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: isPriceError ? 'error.main' : 'text.primary' }}>
              Цена *
            </Typography>
            <TextField
              fullWidth
              value={formData.price}
              onChange={(e) => handleChange('price', e.target.value)}
              onBlur={() => handleBlur('price')}
              error={isPriceError}
              helperText={isPriceError ? 'Укажите корректную цену' : ''}
              InputProps={{
                endAdornment: formData.price && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => handleClear('price')}><ClearIcon fontSize="small" /></IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {formData.category && (<CharacteristicsEdit formData={formData} handleParamChange={handleParamChange}/>)}

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>Описание</Typography>
            <TextField
              fullWidth
              multiline
              rows={5}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              inputProps={{ maxLength: 1000 }}
              helperText={<Box sx={{ textAlign: 'right', width: '100%' }}>{formData.description.length} / 1000</Box>}
            />
          </Box>

          <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
            <Button 
              variant="contained" 
              onClick={handleSubmit}
              disabled={!isFormValid && Object.keys(touched).length > 0}
              sx={{ bgcolor: '#007FFF', textTransform: 'none', px: 4 }}
            >
              Сохранить
            </Button>
            <Button 
              variant="contained" 
              color="inherit" 
              onClick={handleCancel}
              sx={{ bgcolor: '#E0E0E0', color: '#000', textTransform: 'none', px: 4, '&:hover': { bgcolor: '#D5D5D5' } }}
            >
              Отменить
            </Button>
          </Stack>
        </Stack>
      </Paper>

      <Snackbar 
        open={notification.open} 
        autoHideDuration={4000} 
        onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity={notification.type} sx={{ width: '100%', boxShadow: 3 }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EditPage;