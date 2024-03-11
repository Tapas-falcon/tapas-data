import { API_URL } from "./apiProxy";

const moduleName = '/payments';

export const getPaymentTypesAPI = (lang: string): Promise<any> => {
  const query = new URLSearchParams({
    lang
  })
  const header = new Headers();
  header.append("Content-Type", "application/json");
  return fetch(`${API_URL}${moduleName}/paymentTypes?${query}`, {
    method: 'GET',
    headers: header,
  }).then(res => res.json());
}

export const createPaymentAPI = (req: any): Promise<any> => {
  const header = new Headers();
    header.append("Content-Type", "application/json");
    return fetch(`${API_URL}${moduleName}/create`, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(req),
    }).then(res => res.json());
}

export const updatePaymentAPI = (req: any): Promise<any> => {
  const header = new Headers();
    header.append("Content-Type", "application/json");
    return fetch(`${API_URL}${moduleName}/updateStatus`, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(req),
    }).then(res => res.json());
}
