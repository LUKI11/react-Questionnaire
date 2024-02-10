import axios, { ResDataType } from './ajax';

type SearchOption = {
  keyword: string;
  isStar: boolean;
  isDeleted: boolean;
  page: number;
  pageSize: number;
};

// get single questionnaire info by id
export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`;
  const data = (await axios.get(url)) as ResDataType;
  return data;
}

// create a new questionnaire
export async function createQuestionService(): Promise<ResDataType> {
  const url = '/api/question';
  const data = (await axios.post(url)) as ResDataType;
  return data;
}

// get questionnaire list
export async function getQuestionListService(
  opt: Partial<SearchOption> = {},
): Promise<ResDataType> {
  const url = '/api/question';
  const data = (await axios.get(url, { params: opt })) as ResDataType;
  return data;
}

//update a single questionnaire
export async function updateQuestionService(
  id: string,
  opt: { [key: string]: any },
): Promise<ResDataType> {
  const url = `/api/question/${id}`;
  const data = (await axios.patch(url, { opt })) as ResDataType;
  return data;
}

//duplicate a questionnaire
export async function duplicateQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/duplicate/${id}`;
  const data = (await axios.post(url)) as ResDataType;
  return data;
}

// permanently delete question
export async function deleteQuestionService(ids: string[]): Promise<ResDataType> {
  const url = '/api/question';
  const data = (await axios.delete(url, { data: { ids } })) as ResDataType;
  return data;
}
