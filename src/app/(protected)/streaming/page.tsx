import { getAreas } from "@/actions/video-action";
import { AreasGrid } from "./_components/areas-grid";
import { PageContainer } from "@/components/ui/page-container";
import { NavigationBreadcrumb, createSimpleBreadcrumbs } from "@/components/navigation-breadcrumb";

const StreamingPage = async () => {
  const areas = await getAreas();

  const breadcrumbItems = createSimpleBreadcrumbs("Áreas de Conhecimento");

  return (
    <PageContainer className="space-y-8">
      <NavigationBreadcrumb items={breadcrumbItems} />
      
      <div className="flex flex-col text-center">
        <h1>Áreas de Conhecimento</h1>
        <span className="text-muted-foreground">
          Explore nossas áreas de conhecimento e descubra os cursos disponíveis
          em cada uma.
        </span>
      </div>

      <AreasGrid areas={areas} />
    </PageContainer>
  );
};

export default StreamingPage;
