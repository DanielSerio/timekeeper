export type ServiceVersion = `v${number}`;

export interface ApiServiceProps {
  version?: ServiceVersion;
}

type ApiMethodOptions = Omit<RequestInit, 'method'>;

export abstract class ApiService {
  private BASE_URL: string = 'http://localhost:3000';

  protected VERSION: null | ServiceVersion = null;
  private defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json'
  };

  /* The `apiUrl` method in the `ApiService` class is a protected method that constructs a full URL for
  an API endpoint based on the provided path */
  private apiUrl = (path: string) => {

    const version = this.VERSION !== null ? `/${this.VERSION}/` : '/';
    const finalPath = `${path.replace(/^\//, '')}`;

    return `${this.BASE_URL}${version}${finalPath}`;
  };

  constructor(props?: ApiServiceProps) {
    this.init(props);
  }

  private init = (props?: ApiServiceProps) => {
    if (!props) {
      return;
    }

    if (props.version) {
      this.VERSION = props.version;
    }
  };

  private apiRequest = async <RT>(method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', url: string, init?: ApiMethodOptions) => {
    const apiUrl = this.apiUrl(url);
    return await fetch(apiUrl, {
      method,
      ...init,
      headers: {
        ...this.defaultHeaders,
        ...init?.headers,
      },
    }) as Response & RT;
  };

  protected GET<RT extends object | undefined>(url: string, init?: ApiMethodOptions) {
    return this.apiRequest<RT>('GET', url, init);
  }

  protected POST<RT extends object | undefined>(url: string, init?: ApiMethodOptions) {
    return this.apiRequest<RT>('POST', url, init);
  }

  protected PUT<RT extends object | undefined>(url: string, init?: ApiMethodOptions) {
    return this.apiRequest<RT>('PUT', url, init);
  }

  protected PATCH<RT extends object | undefined>(url: string, init?: ApiMethodOptions) {
    return this.apiRequest<RT>('PATCH', url, init);
  }

  protected DELETE<RT extends object | undefined>(url: string, init?: ApiMethodOptions) {
    return this.apiRequest<RT>('DELETE', url, init);
  }
}