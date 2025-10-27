import { getCourseVideos } from "@/actions/video-action";
import { CourseDetailsServer } from "./_components/course-details-server";
import { PageContainer } from "@/components/ui/page-container";
import type { CoursePageProps } from "@/types";

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const courseData = await getCourseVideos(slug);

  return (
    <PageContainer>
      <CourseDetailsServer courseData={courseData} />
    </PageContainer>
  );
}
