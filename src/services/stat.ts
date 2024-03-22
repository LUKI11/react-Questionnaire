import axios, { ResDataType } from './ajax';

export async function getStatList(
  questionId: string,
  opt: { page: number; pageSize: number },
): Promise<ResDataType> {
  const url = `/api/stat/${questionId}`;
  const data = (await axios.get(url, { params: opt })) as ResDataType;
  return data;
}
