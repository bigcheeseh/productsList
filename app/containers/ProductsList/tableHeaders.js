import moment from 'moment';

const dateFormat = 'DD.MM.YYYY';

export const tableHeaders = [
  {
    key: 'id',
    name: 'ID Товара',
  },
  {
    key: 'updatedAt',
    name: 'Дата обновления',
    wrapper: data => moment(data).format(dateFormat),
  },
  {
    key: 'status',
    name: 'Статус',
  },
  {
    key: 'name',
    name: 'Наименование товара',
  },
  {
    key: 'cashbackamount',
    name: '% КБ',
  },
  {
    key: 'actionbegin',
    name: 'Дата начала',
    wrapper: data => moment(data).format(dateFormat),
  },
  {
    key: 'actionend',
    name: 'Дата завершения',
    wrapper: data => moment(data).format(dateFormat),
  },
];
