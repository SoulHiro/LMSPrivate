import { getCoursesByArea } from "@/actions/video-action";
import { CoursesGrid } from "./_components/courses-grid";
import { PageContainer } from "@/components/ui/page-container";
import { notFound } from "next/navigation";
import type { AreaPageProps } from "@/types";

const AreaPage = async ({ params }: AreaPageProps) => {
  const { slug } = await params;
  const result = await getCoursesByArea(slug);

  if (!result) {
    notFound();
  }

  const { area, courses } = result;

  return (
    <PageContainer>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-2">{area.name}</h1>
          <p className="text-muted-foreground">
            Cursos disponíveis na área de {area.name.toLowerCase()}.
          </p>
        </div>

        <CoursesGrid courses={courses} />
      </div>
    </PageContainer>
  );
};

export default AreaPage;
