import { getCoursesByArea } from "@/actions/video-action";
import { CoursesGrid } from "./_components/courses-grid";
import { notFound } from "next/navigation";

interface AreaPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const AreaPage = async ({ params }: AreaPageProps) => {
  const { slug } = await params;
  const result = await getCoursesByArea(slug);

  if (!result) {
    notFound();
  }

  const { area, courses } = result;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            {area.name}
          </h1>
          <p className="text-gray-600">
            Cursos disponíveis na área de {area.name.toLowerCase()}.
          </p>
        </div>

        {/* Courses Grid Component */}
        <CoursesGrid courses={courses} />
      </div>
    </div>
  );
};

export default AreaPage;