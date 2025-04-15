import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap } from "lucide-react"

// Sample data for demonstration
const trendingTopics = [
  {
    id: 1,
    name: "#AdoteNãoCompre",
    posts: 1245,
    category: "Adoção",
  },
  {
    id: 2,
    name: "#DicasDeCuidados",
    posts: 987,
    category: "Saúde Pet",
  },
  {
    id: 3,
    name: "#CachorroFofo",
    posts: 756,
    category: "Cachorros",
  },
  {
    id: 4,
    name: "#GatosDormindo",
    posts: 543,
    category: "Gatos",
  },
  {
    id: 5,
    name: "#PetsDoDia",
    posts: 432,
    category: "Tendências",
  },
  {
    id: 6,
    name: "#PassarinhoColorido",
    posts: 387,
    category: "Aves",
  },
  {
    id: 7,
    name: "#CoelhinhoFofo",
    posts: 321,
    category: "Roedores",
  },
]

export function TrendingTopics() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Zap className="h-4 w-4" />
          Assuntos do momento
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {trendingTopics.map((topic) => (
          <div key={topic.id} className="space-y-1">
            <p className="text-xs text-muted-foreground">{topic.category}</p>
            <div className="flex items-center justify-between">
              <Link href={`/hashtag/${topic.name.substring(1)}`} className="font-medium text-sm hover:underline">
                {topic.name}
              </Link>
              <span className="text-xs text-muted-foreground">{topic.posts} posts</span>
            </div>
          </div>
        ))}
        <Link href="/explore/trending" className="text-sm text-primary hover:underline mt-2 inline-block">
          Mostrar mais
        </Link>
      </CardContent>
    </Card>
  )
}
