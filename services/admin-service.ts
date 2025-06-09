import api from '@/lib/api'

interface AdminCourse {
  id: string
  title: string
  description: string
  price: string
  originalPrice?: string
  duration: string
  level: string
  category: string
  features: string[]
  instructor: {
    name: string
    title: string
    avatar: string
  }
  thumbnail?: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

interface AdminUser {
  id: string
  email: string
  name: string
  role: "admin" | "instructor" | "student"
  createdAt: string
}

class AdminService {
  // Course management
  async getAllCourses(): Promise<AdminCourse[]> {
    try {
      const { data } = await api.get('/courses');
      return data;
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      return [];
    }
  }

  async getCourse(id: string): Promise<AdminCourse | undefined> {
    try {
      const { data } = await api.get(`/courses/${id}`);
      return data;
    } catch (error) {
      console.error(`Failed to fetch course ${id}:`, error);
      return undefined;
    }
  }

  async createCourse(course: Omit<AdminCourse, "id" | "createdAt" | "updatedAt">): Promise<AdminCourse> {
    try {
      const { data } = await api.post('/courses', course);
      return data;
    } catch (error) {
      console.error('Failed to create course:', error);
      throw error;
    }
  }

  async updateCourse(id: string, updates: Partial<AdminCourse>): Promise<AdminCourse | null> {
    try {
      const { data } = await api.put(`/courses/${id}`, updates);
      return data;
    } catch (error) {
      console.error(`Failed to update course ${id}:`, error);
      return null;
    }
  }

  async deleteCourse(id: string): Promise<boolean> {
    try {
      await api.delete(`/courses/${id}`);
      return true;
    } catch (error) {
      console.error(`Failed to delete course ${id}:`, error);
      return false;
    }
  }

  // User management
  async getAllUsers(): Promise<AdminUser[]> {
    try {
      const { data } = await api.get('/admin/users');
      return data;
    } catch (error) {
      console.error('Failed to fetch users:', error);
      return [];
    }
  }

  async createUser(user: Omit<AdminUser, "id" | "createdAt">): Promise<AdminUser> {
    try {
      const { data } = await api.post('/admin/users', user);
      return data;
    } catch (error) {
      console.error('Failed to create user:', error);
      throw error;
    }
  }

  // Analytics
  async getAnalytics() {
    const { data } = await api.get('/admin/stats')
    return data
  }

  async sendAnnouncement(message: string) {
    const { data } = await api.post('/admin/send-announcement', { message })
    return data
  }
}

export const adminService = new AdminService();
export type { AdminCourse, AdminUser };
