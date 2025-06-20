// app/dashboard/courses/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Star, Clock, User, ArrowLeft } from 'lucide-react';

interface CourseContent {
  [lang: string]: {
    intro: string;
    sections: string[];
    quiz: {
      question: string;
      options: string[];
      answer: string;
    }[];
  };
}

interface Course {
  course: string;
  content: CourseContent;
}

interface CourseData {
  [key: string]: Course;
}

export default function CourseDetailPage() {
  const { id } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockCourses: CourseData = {
          "Driving": {
            course: "Driving",
            content: {
              en: {
                intro: "Learning to drive...",
                sections: ["Basic traffic laws..."],
                quiz: [{
                  question: "What is the speed limit...",
                  options: ["30 km/h", "50 km/h"],
                  answer: "50 km/h"
                }]
              }
            }
          }
        };

        if (typeof id !== 'string' || !(id in mockCourses)) {
          throw new Error('Course not found');
        }

        setCourse(mockCourses[id]);
      } catch (err) {
        setError('Failed to load course. Please try again later.');
        console.error('Error fetching course:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-8 w-3/4 mb-6" />
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
              <Skeleton className="h-6 w-4/6" />
              <div className="space-y-2 mt-6">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
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

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <p>Course not found</p>
          <Button asChild className="mt-4">
            <Link href="/dashboard/courses">
              Back to Courses
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const content = course.content.en || course.content[Object.keys(course.content)[0]];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/dashboard/courses" className="flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Link>
        </Button>

        <h1 className="text-3xl font-bold mb-6">{course.course}</h1>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Course Overview</h2>
              </CardHeader>
              <CardContent>
                <p className="mb-6 text-gray-700">{content.intro}</p>
                
                <h3 className="text-lg font-medium mb-4">What You'll Learn</h3>
                <ul className="space-y-2">
                  {content.sections.map((section, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>{section}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="flex items-center text-yellow-500">
                    <Star className="w-5 h-5 fill-current mr-1" />
                    <span>4.8 (120 reviews)</span>
                  </span>
                  <span className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-1" />
                    <span>8 hours</span>
                  </span>
                </div>

                <div className="flex items-center mb-6 text-gray-600">
                  <User className="w-5 h-5 mr-1" />
                  <span>John Doe</span>
                </div>

                <Button className="w-full mb-4" size="lg">
                  Continue Learning
                </Button>

                <Button variant="outline" className="w-full" size="lg">
                  Download Resources
                </Button>

                <div className="mt-6 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Progress</span>
                    <span>25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Accessed</span>
                    <span>2 days ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}