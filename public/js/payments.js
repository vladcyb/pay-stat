import { categories } from './categories.js'

export const payments = {
  20250301: [
    { name: 'Кофе в кофемашине', category: categories.food, value: 120 },
    { name: 'Бургер с картошкой', category: categories.fastfood, value: 350 },
    { name: 'Шоколадный батончик', category: categories.sweets, value: 90 },
    { name: 'Бутылка вина', category: categories.alcohol, value: 800 },
    { name: 'Замена масла в двигателе', category: categories.car, value: 3000 },
  ],
  20250302: [
    { name: 'Обед в столовой', category: categories.food, value: 280 },
    { name: 'Проезд на метро', category: categories.transport, value: 60 },
    {
      name: 'Онлайн-курс по программированию',
      category: categories.education,
      value: 2500,
    },
    {
      name: 'Средство для мытья посуды',
      category: categories.household,
      value: 150,
    },
    { name: 'Билет в кино', category: categories.entertainment, value: 500 },
    { name: 'Бензин АИ-95 (30л)', category: categories.car, value: 1800 },
  ],
  20250303: [
    { name: 'Фрукты на неделю', category: categories.food, value: 750 },
    { name: 'Пицца с доставкой', category: categories.fastfood, value: 650 },
    { name: 'Чай в кафе', category: categories.cafe, value: 220 },
    { name: 'Новые колготки', category: categories.clothes, value: 400 },
    { name: 'Мойка автомобиля', category: categories.car, value: 600 },
  ],
}
