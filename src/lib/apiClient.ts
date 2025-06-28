// API Client utility for authenticated requests

// Base URL for API requests - use relative URL in production
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api' 
  : '/api';

// Helper to get auth token from local storage
const getToken = (): string | null => {
  return localStorage.getItem('auth_token') || localStorage.getItem('adminToken');
};

// Helper to get visitor info from local storage
const getVisitorInfo = (): { code: string; name: string } | null => {
  const info = localStorage.getItem('visitor_info');
  return info ? JSON.parse(info) : null;
};

// Helper to save visitor info to local storage
const saveVisitorInfo = (info: { code: string; name: string }): void => {
  localStorage.setItem('visitor_info', JSON.stringify(info));
};

// Type for API options
interface ApiOptions {
  headers?: Record<string, string>;
  body?: any;
  withAuth?: boolean;
  noThrow?: boolean; // Option to prevent throwing errors
}

// Type for API error
interface ApiError extends Error {
  status?: number;
  data?: any;
}

/**
 * Fetch with authentication header and JSON handling
 */
export const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  // Get token from localStorage
  const token = localStorage.getItem('adminToken');
  
  // Prepare headers with authentication
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers
  };
  
  try {
    // Perform fetch with authorization headers
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });
    
    // Parse JSON response
    const data = await response.json();
    
    // Handle unauthorized responses
    if (response.status === 401 || response.status === 403) {
      // Clear token if it's invalid or expired
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminLoggedIn');
      localStorage.removeItem('adminUsername');
      
      // Redirect to login
      window.location.href = '/admin/login';
      throw new Error('Session expired. Please log in again.');
    }
    
    // If response is not OK, throw error
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }
    
    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

// Main API client methods
export const apiClient = {
  /**
   * Make a GET request to the API
   */
  async get(endpoint: string, options: ApiOptions = { withAuth: true }): Promise<any> {
    return this.request('GET', endpoint, options);
  },

  /**
   * Make a POST request to the API
   */
  async post(endpoint: string, body: any, options: ApiOptions = { withAuth: true }): Promise<any> {
    return this.request('POST', endpoint, { ...options, body });
  },

  /**
   * Like post - special handling to prevent site disappearance
   */
  async likePost(postId: string): Promise<any> {
    try {
      return await this.post(`/posts/${postId}/like`, {}, { noThrow: true });
    } catch (error) {
      console.error('Error liking post:', error);
      // Return a default response to prevent site crash
      return { success: false, error: 'Failed to like post' };
    }
  },

  /**
   * Make a PUT request to the API
   */
  async put(endpoint: string, body: any, options: ApiOptions = { withAuth: true }): Promise<any> {
    return this.request('PUT', endpoint, { ...options, body });
  },

  /**
   * Make a DELETE request to the API
   */
  async delete(endpoint: string, options: ApiOptions = { withAuth: true }): Promise<any> {
    return this.request('DELETE', endpoint, options);
  },

  /**
   * Generic request method
   */
  async request(method: string, endpoint: string, options: ApiOptions = {}): Promise<any> {
    const { headers = {}, body, withAuth = true, noThrow = false } = options;

    // Build request URL
    const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

    // Prepare headers
    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    };

    // Add auth token if required
    if (withAuth) {
      const token = getToken();
      if (token) {
        requestHeaders['Authorization'] = `Bearer ${token}`;
      }
    }

    // Build fetch options
    const fetchOptions: RequestInit = {
      method,
      headers: requestHeaders,
    };

    // Add request body if present
    if (body) {
      fetchOptions.body = JSON.stringify(body);
    }

    try {
      // Make the request
      const response = await fetch(url, fetchOptions);

      // Parse JSON response
      let data;
      try {
        data = await response.json();
      } catch (e) {
        // If response is not JSON, create a default response object
        data = { success: response.ok, status: response.status };
      }

      // Handle API errors
      if (!response.ok && !noThrow) {
        const error = new Error(data.message || 'API request failed') as ApiError;
        error.status = response.status;
        error.data = data;
        throw error;
      }

      // If this is a visitor code response, store it
      if (endpoint === '/visitor/code' || endpoint === '/visitor/name') {
        saveVisitorInfo(data);
      }

      // Return successful response
      return data;
    } catch (error) {
      // Re-throw error for handling in components, unless noThrow is set
      console.error(`API ${method} request to ${endpoint} failed:`, error);
      if (noThrow) {
        return { success: false, error: (error as Error).message };
      }
      throw error;
    }
  },

  /**
   * Login method - handles authentication and token storage
   */
  async login(username: string, password: string): Promise<any> {
    try {
      // Make login request without authentication
      const response = await this.post('/auth/login', { username, password }, { withAuth: false });

      // Store token in local storage
      if (response.token) {
        localStorage.setItem('auth_token', response.token);
        
        // Store login time for display in the admin dashboard
        localStorage.setItem('adminLoginTime', new Date().toISOString());
      }

      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  /**
   * Logout method - clears authentication
   */
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('adminLoginTime');
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!getToken();
  },
  
  /**
   * Verify token validity with backend
   */
  async verifyToken(): Promise<boolean> {
    try {
      if (!this.isAuthenticated()) {
        return false;
      }
      
      await this.get('/auth/verify');
      return true;
    } catch (error) {
      // Token is invalid or expired
      this.logout();
      return false;
    }
  },

  /**
   * Get visitor information
   */
  getVisitorInfo(): { code: string; name: string } | null {
    return getVisitorInfo();
  }
};

export default apiClient; 