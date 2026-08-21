export class ApiRequestError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message)
  }
}

async function parseJson(response: Response) {
  try {
    return await response.json()
  } catch {
    throw new ApiRequestError(response.status, 'Invalid response from server')
  }
}

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response

  try {
    response = await fetch(path, init)
  } catch {
    throw new ApiRequestError(0, 'Network error')
  }

  const data = await parseJson(response)

  if (!response.ok) {
    const message = typeof data?.message === 'string' ? data.message : 'Request failed'
    throw new ApiRequestError(response.status, message)
  }

  return data as T
}
