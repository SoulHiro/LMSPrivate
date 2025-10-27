import { getCourseVideos } from "@/actions/video-action";
import { CourseDetailsServer } from "./_components/course-details-server";
import { CourseDetailsClient } from "./_components/course-details-client";

interface CoursePageProps {
  params: {
    slug: string;
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const courseData = await getCourseVideos(params.slug);

  return (
    <div className="container mx-auto px-4 py-8">
      <CourseDetailsClient courseData={courseData} />
      <CourseDetailsServer courseData={courseData} />
    </div>
  );
}