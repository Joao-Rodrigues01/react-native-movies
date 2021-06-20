import { format  } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export default function formatDate(date: string) {

  const splitedDate = date.split('-');

  const [ano, mes, dia] = splitedDate.map(data => Number(data))

  const dateFormat = new Date(ano, mes - 1, dia);

  return format(dateFormat, 'MMM dd, yyyy', { locale: ptBR });
}

export function getTheYear(date: string) {
  const splitedDate = date.split('-');

  const [ano, mes, dia] = splitedDate.map(data => Number(data))

  const dateFormat = new Date(ano, mes - 1, dia);

  return format(dateFormat, 'yyyy', { locale: ptBR })
}