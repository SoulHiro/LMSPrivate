import { getVideo, getCourseVideos } from "@/actions/video-action";
import { VideoPlayerClient } from "./_components/video-player-client";
import { notFound } from "next/navigation";
import { PageContainer } from "@/components/ui/page-container";

interface VideoPageProps {
  params: Promise<{
    id: string;
  }>;
}

const VideoPage = async ({ params }: VideoPageProps) => {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const video = await getVideo(id);

  if (!video) {
    notFound();
  }

  let courseData = null;

  if (video.course?.pathSlug) {
    try {
      courseData = await getCourseVideos(video.course.pathSlug);
    } catch (error) {
      console.error("Erro ao buscar dados do curso:", error);
    }
  }

  return (
    <PageContainer>
      <VideoPlayerClient video={video} courseData={courseData} />
    </PageContainer>
  );
};

export default VideoPage;
