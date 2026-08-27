import { ApiResponse } from '@nexus/shared';

export class ApiClient {
  private static baseURL = '/api/v1';

  private static getHeaders(): HeadersInit {
    const token = localStorage.getItem('nexus_token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  public static async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    let url = `${this.baseURL}${endpoint}`;
    if (params) {
      const query = new URLSearchParams(params).toString();
      url += `?${query}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    const body: ApiResponse<T> = await response.json();
    if (!response.ok || !body.success) {
      throw new Error(body.error?.message || 'API request failed');
    }
    return body.data!;
  }

  public static async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    const body: ApiResponse<T> = await response.json();
    if (!response.ok || !body.success) {
      throw new Error(body.error?.message || 'API request failed');
    }
    return body.data!;
  }

  public static async patch<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    const body: ApiResponse<T> = await response.json();
    if (!response.ok || !body.success) {
      throw new Error(body.error?.message || 'API request failed');
    }
    return body.data!;
  }

  public static async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    const body: ApiResponse<T> = await response.json();
    if (!response.ok || !body.success) {
      throw new Error(body.error?.message || 'API request failed');
    }
    return body.data!;
  }
}
