// services/course-service.ts
import coursesData from '@/data/courses.json';

interface Course {
  course: string;
  content: {
    [key: string]: {
      intro: string;
      sections: string[];
      quiz: {
        question: string;
        options: string[];
        answer: string;
      }[];
    };
  };
}

export async function getCourseById(id: string): Promise<Course> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const course = coursesData.courses.find(c => c.course.toLowerCase() === id.toLowerCase());
  
  if (!course) {
    throw new Error('Course not found');
  }
  
  return course;
}