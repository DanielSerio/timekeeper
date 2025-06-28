import type { ZodError } from "zod";

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

  private isZodError<T>(error: unknown): error is ZodError<T> {
    const asZod = error as ZodError<T>;

    if (asZod.issues && asZod.errors) {
      return true;
    }

    return false;
  }

  private isError(error: unknown): error is Error {
    const asError = error as Error;

    if (asError.name && asError.message) {
      return true;
    }

    return false;
  }

  private handleApiError(error: unknown) {
    if (this.isError(error)) {
      return error as Error;
    }

    const newError = new Error(`Non-error object thrown: ${JSON.stringify(error)}`);
    newError.name = 'NonErrorThrown';

    return newError;
  }

  private handleClientError<T>(response: Response) {
    const error = response.json() as unknown;

    if (this.isZodError<T>(error)) {
      return error as ZodError<T>;
    }

    return this.handleApiError(error);
  }

  private handleNotFoundError(response: Response) {
    const error = response.json() as unknown;

    return this.handleApiError(error);
  }

  private handleErrorResponse(response: Response) {
    if (response.status === 400) {
      return this.handleClientError(response);
    } else if (response.status === 404) {
      return this.handleNotFoundError(response);
    }

    const error = response.json() as unknown;

    return this.handleApiError(error);
  }

  private apiRequest = async <RT>(method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', url: string, init?: ApiMethodOptions) => {
    const apiUrl = this.apiUrl(url);
    const response = await fetch(apiUrl, {
      method,
      ...init,
      headers: {
        ...this.defaultHeaders,
        ...init?.headers,
      },
    }) as Response & RT;

    if (!response.ok) {
      throw this.handleErrorResponse(response);
    }

    return response;
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