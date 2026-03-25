import { Box, Typography, TextField, MenuItem, Stack } from "@mui/material";
import type { FormData } from '../../types';

const CharacteristicsEdit = ({formData, handleParamChange} : {formData: FormData, handleParamChange: Function}) => {

  const getWarningSx = (value: any) => {
    const isEmpty = value === undefined || value === null || value === "";
    return isEmpty
      ? {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#FFB84D",
            borderWidth: "2px",
          },
        }
      : {};
  };

  const renderParams = () => {
    if (formData.category === "electronics") {
      return (
        <>
          <TextField
            select
            label="Тип"
            fullWidth
            value={formData.params.type || ""}
            onChange={(e) => handleParamChange("type", e.target.value)}
            sx={getWarningSx(formData.params.type)}
          >
            <MenuItem value="laptop">Ноутбук</MenuItem>
            <MenuItem value="phone">Телефон</MenuItem>
            <MenuItem value="misc">Другое</MenuItem>
          </TextField>
          <TextField
            label="Бренд"
            fullWidth
            value={formData.params.brand || ""}
            onChange={(e) => handleParamChange("brand", e.target.value)}
            sx={getWarningSx(formData.params.brand)}
          />
          <TextField
            label="Модель"
            fullWidth
            value={formData.params.model || ""}
            onChange={(e) => handleParamChange("model", e.target.value)}
            sx={getWarningSx(formData.params.model)}
          />
          <TextField
            label="Цвет"
            fullWidth
            value={formData.params.color || ""}
            onChange={(e) => handleParamChange("color", e.target.value)}
            sx={getWarningSx(formData.params.color)}
          />
          <TextField
            select
            label="Состояние"
            fullWidth
            value={formData.params.condition || ""}
            onChange={(e) => handleParamChange("condition", e.target.value)}
            sx={getWarningSx(formData.params.condition)}
          >
            <MenuItem value="new">Новое</MenuItem>
            <MenuItem value="used">Б/У</MenuItem>
          </TextField>
        </>
      );
    }
    if (formData.category === "auto") {
      return (
        <>
          <TextField
            label="Бренд"
            fullWidth
            value={formData.params.brand || ""}
            onChange={(e) => handleParamChange("brand", e.target.value)}
            sx={getWarningSx(formData.params.brand)}
          />
          <TextField
            label="Модель"
            fullWidth
            value={formData.params.model || ""}
            onChange={(e) => handleParamChange("model", e.target.value)}
            sx={getWarningSx(formData.params.model)}
          />
          <TextField
            label="Год выпуска"
            type="number"
            fullWidth
            value={formData.params.yearOfManufacture || ""}
            onChange={(e) =>
              handleParamChange("yearOfManufacture", Number(e.target.value))
            }
            sx={getWarningSx(formData.params.yearOfManufacture)}
          />
        </>
      );
    }
    if (formData.category === "real_estate") {
      return (
        <>
          <TextField
            select
            label="Тип недвижимости"
            fullWidth
            value={formData.params.type || ""}
            onChange={(e) => handleParamChange("type", e.target.value)}
            sx={getWarningSx(formData.params.type)}
          >
            <MenuItem value="flat">Квартира</MenuItem>
            <MenuItem value="house">Дом</MenuItem>
            <MenuItem value="room">Комната</MenuItem>
          </TextField>
          <TextField
            label="Адрес"
            fullWidth
            value={formData.params.address || ""}
            onChange={(e) => handleParamChange("address", e.target.value)}
            sx={getWarningSx(formData.params.address)}
          />
        </>
      );
    }
    return null;
  };
  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: "bold" }}>
        Характеристики
      </Typography>
      <Stack spacing={2}>{renderParams()}</Stack>
    </Box>
  );
};

export default CharacteristicsEdit;
