// app/dashboard/courses/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Star, Clock, User } from 'lucide-react';

interface Course {
  course: string;
  content: {
    [key: string]: {
      intro: string;
    };
  };
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        // Mock data fetch - replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 500));
        const mockCourses = [
          { course: "Driving", content: { en: { intro: "Learn to drive safely and confidently" } } },
          { course: "Restaurants", content: { en: { intro: "Master restaurant management skills" } } },
          { course: "Freelance", content: { en: { intro: "Build a successful freelance business" } } }
        ];
        setCourses(mockCourses);
      } catch (err) {
        setError('Failed to load courses. Please try again later.');
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">My Courses</h1>
        <Button asChild>
          <Link href="/dashboard/courses/new">Add New Course</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.course} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <h2 className="text-xl font-semibold">{course.course}</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {course.content.en?.intro || 'No description available'}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center text-yellow-500">
                  <Star className="w-4 h-4 fill-current mr-1" />
                  4.8
                </span>
                <span className="flex items-center text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  8h
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/dashboard/courses/${course.course}`}>
                  View Course
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}