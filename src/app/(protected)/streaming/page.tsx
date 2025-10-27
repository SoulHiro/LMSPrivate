import { getAreas } from "@/actions/video-action";
import { AreasGrid } from "./_components/areas-grid";

const StreamingPage = async () => {
  const areas = await getAreas();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 flex flex-col text-center">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Áreas de Conhecimento
          </h1>
          <p className="text-gray-600">
            Explore nossas áreas de conhecimento e descubra os cursos
            disponíveis em cada uma.
          </p>
        </div>

        {/* Areas Grid Component */}
        <AreasGrid areas={areas} />
      </div>
    </div>
  );
};

export default StreamingPage;
