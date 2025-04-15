import { ExploreGallery } from "@/components/explore-gallery"
import { TrendingTopics } from "@/components/trending-topics"

export default function ExplorePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6">Explore</h1>
          <ExploreGallery />
        </div>
        <div className="md:w-80 space-y-6">
          <TrendingTopics />
          <div className="rounded-lg border p-4">
            <h3 className="font-medium mb-2">Sobre o Pixabay</h3>
            <p className="text-sm text-muted-foreground mb-4">
              O Pixabay é um site que oferece imagens e vídeos de alta qualidade livres de royalties. Todas as imagens
              podem ser baixadas e usadas gratuitamente.
            </p>
            <div className="text-xs text-muted-foreground">
              <p>Imagens usadas sob a licença Pixabay</p>
              <p>Livre para uso comercial</p>
              <p>Não é necessária atribuição</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
