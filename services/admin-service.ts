<<<<<<< HEAD
=======
import api from '@/lib/api'

>>>>>>> 82081f5 (update V3)
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
<<<<<<< HEAD
  private courses: AdminCourse[] = [
    {
      id: "shopify-starter",
      title: "Shopify Starter Kit",
      description: "Learn the basics of setting up and running a Shopify store",
      price: "$29",
      originalPrice: "$49",
      duration: "2 hours",
      level: "Beginner",
      category: "E-commerce",
      features: ["Store Setup", "Product Management", "Payment Processing", "Basic Marketing", "Order Fulfillment"],
      instructor: {
        name: "Sarah Johnson",
        title: "E-commerce Specialist",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      isPublished: true,
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20",
    },
    {
      id: "tiktok-ads-mini",
      title: "TikTok Ads Mini Course",
      description: "Quick introduction to creating effective TikTok ad campaigns",
      price: "$19",
      originalPrice: "$39",
      duration: "1.5 hours",
      level: "Beginner",
      category: "Marketing",
      features: ["Ad Creation", "Targeting Strategies", "Budget Optimization", "Performance Tracking"],
      instructor: {
        name: "Mike Chen",
        title: "Digital Marketing Expert",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      isPublished: true,
      createdAt: "2024-01-10",
      updatedAt: "2024-01-18",
    },
    {
      id: "intro-ai-prompting",
      title: "Intro to AI Prompting",
      description: "Learn the fundamentals of crafting effective prompts for AI tools",
      price: "$24",
      originalPrice: "$44",
      duration: "2 hours",
      level: "Beginner",
      category: "AI & Automation",
      features: ["Prompt Engineering", "AI Tool Selection", "Workflow Integration", "Best Practices"],
      instructor: {
        name: "Alex Rodriguez",
        title: "AI Specialist",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      isPublished: true,
      createdAt: "2024-01-12",
      updatedAt: "2024-01-22",
    },
  ]

  private users: AdminUser[] = [
    {
      id: "admin-1",
      email: "admin@reskil.com",
      name: "Admin User",
      role: "admin",
      createdAt: "2024-01-01",
    },
  ]

  // Course management
  getAllCourses(): AdminCourse[] {
    return this.courses
  }

  getCourse(id: string): AdminCourse | undefined {
    return this.courses.find((course) => course.id === id)
  }

  createCourse(course: Omit<AdminCourse, "id" | "createdAt" | "updatedAt">): AdminCourse {
    const newCourse: AdminCourse = {
      ...course,
      id: `course-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    this.courses.push(newCourse)
    return newCourse
  }

  updateCourse(id: string, updates: Partial<AdminCourse>): AdminCourse | null {
    const courseIndex = this.courses.findIndex((course) => course.id === id)
    if (courseIndex === -1) return null

    this.courses[courseIndex] = {
      ...this.courses[courseIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    return this.courses[courseIndex]
  }

  deleteCourse(id: string): boolean {
    const courseIndex = this.courses.findIndex((course) => course.id === id)
    if (courseIndex === -1) return false

    this.courses.splice(courseIndex, 1)
    return true
  }

  // User management
  getAllUsers(): AdminUser[] {
    return this.users
  }

  createUser(user: Omit<AdminUser, "id" | "createdAt">): AdminUser {
    const newUser: AdminUser = {
      ...user,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    this.users.push(newUser)
    return newUser
  }

  // Analytics
  getAnalytics() {
    return {
      totalCourses: this.courses.length,
      publishedCourses: this.courses.filter((c) => c.isPublished).length,
      totalUsers: this.users.length,
      totalRevenue: "$12,450", // Mock data
      monthlyGrowth: "+15%", // Mock data
    }
  }
}

export const adminService = new AdminService()
export type { AdminCourse, AdminUser }
=======
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
>>>>>>> 82081f5 (update V3)
