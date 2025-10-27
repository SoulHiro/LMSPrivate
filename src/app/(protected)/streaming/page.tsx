import { getAreas } from "@/actions/video-action";
import { AreasGrid } from "./_components/areas-grid";
import { PageContainer } from "@/components/ui/page-container";

const StreamingPage = async () => {
  const areas = await getAreas();

  return (
    <PageContainer className="space-y-8">
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
