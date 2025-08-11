const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

export type RequestOptions = RequestInit & {
  timeoutMs?: number;
};

export class HttpClient {
  get<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: "GET" });
  }

  post<T>(path: string, body: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
  }

  delete<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: "DELETE" });
  }

  private async request<T>(path: string, options?: RequestOptions): Promise<T> {
    const controller = new AbortController();
    const { timeoutMs } = options || {};

    let timeoutId: NodeJS.Timeout | undefined = undefined;

    if (timeoutMs) {
      timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    }

    try {
      const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(options?.headers || {}),
        },
        signal: controller.signal,
      });

      const body = await response.json();

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return body as T;
    } catch (error) {
      console.error("HTTP request failed:", error);
      throw error;
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }
  }
}
