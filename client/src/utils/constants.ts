export const fieldLabels: Record<string, string> = {
    title: 'Название',
    description: 'Описание',
    price: 'Цена',
    brand: 'Бренд',
    model: 'Модель',
    yearOfManufacture: 'Год выпуска',
    transmission: 'Коробка передач',
    mileage: 'Пробег',
    enginePower: 'Мощность двигателя',
    type: 'Тип',
    address: 'Адрес',
    area: 'Площадь',
    floor: 'Этаж',
    condition: 'Состояние',
    color: 'Цвет',
};

export const categoryRequiredFields: Record<string, string[]> = {
  auto: ['brand', 'model', 'yearOfManufacture', 'transmission', 'mileage'],
  real_estate: ['type', 'address', 'area', 'floor'],
  electronics: ['type', 'brand', 'model', 'condition', 'color'],
};

export const CATEGORIES = [
  { value: 'auto', label: 'Авто' },
  { value: 'real_estate', label: 'Недвижимость' },
  { value: 'electronics', label: 'Электроника' },
];