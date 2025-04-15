import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"
import { PawPrint, Feather, Zap } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center">
              <PawPrint className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">PawTalk</span>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/login">Entrar</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/register">Criar Conta</Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 xl:py-40">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  <PawPrint className="h-4 w-4 inline-block mr-1" /> A rede social para amantes de animais
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Compartilhe fotos e pensamentos sobre seus pets
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Conecte-se com outros amantes de animais, compartilhe fotos, expresse seus pensamentos e descubra
                  conteúdo exclusivo sobre pets.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
                  >
                    <Link href="/register">Comece agora</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/explore">Explorar</Link>
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Zap className="h-4 w-4" />
                  <span>Mais de 10.000 usuários ativos</span>
                </div>
              </div>
              <div className="relative mx-auto overflow-hidden rounded-xl md:aspect-square lg:order-last">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <div className="overflow-hidden rounded-lg">
                      <Image
                        src="/images/chihuahua.png"
                        alt="Chihuahua sorridente"
                        width={300}
                        height={300}
                        className="h-auto w-full object-cover transition-all hover:scale-105 aspect-square"
                      />
                    </div>
                    <div className="overflow-hidden rounded-lg bg-muted p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                          <PawPrint className="h-4 w-4 text-emerald-600" />
                        </div>
                        <span className="font-medium">@chihuahualover</span>
                      </div>
                      <p className="text-sm">
                        Sabia que os Chihuahuas são a menor raça de cães do mundo? Eles têm o maior cérebro em relação
                        ao tamanho do corpo entre todas as raças caninas! 🧠🐕 #SmartPets
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="overflow-hidden rounded-lg bg-muted p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center">
                          <PawPrint className="h-4 w-4 text-cyan-600" />
                        </div>
                        <span className="font-medium">@catperson</span>
                      </div>
                      <p className="text-sm">
                        Os gatos podem fazer mais de 100 sons vocais diferentes, enquanto os cães só conseguem fazer
                        cerca de 10! 😺 #CatFacts
                      </p>
                    </div>
                    <div className="overflow-hidden rounded-lg">
                      <Image
                        src="/images/tabby-cat.png"
                        alt="Gato tabby deitado"
                        width={300}
                        height={300}
                        className="h-auto w-full object-cover transition-all hover:scale-105 aspect-square"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Curiosidades
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Fatos fascinantes sobre pets
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Descubra informações surpreendentes sobre nossos amigos de quatro patas
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 transition-all hover:shadow-md">
                <div className="relative w-full aspect-square overflow-hidden rounded-lg">
                  <Image
                    src="/images/tourist-dog.png"
                    alt="Cachorro turista com óculos de sol"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">O Viajante de Quatro Patas</h3>
                <p className="text-center text-muted-foreground">
                  Os cães Jack Russell Terrier foram originalmente criados para caça de raposas. Hoje, são conhecidos
                  por sua energia inesgotável e inteligência. Um Jack Russell pode pular até 5 vezes sua própria altura!
                </p>
                <Badge className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600">
                  #DogFacts
                </Badge>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 transition-all hover:shadow-md">
                <div className="relative w-full aspect-square overflow-hidden rounded-lg">
                  <Image src="/images/gray-kitten.png" alt="Gatinho cinza espiando" fill className="object-cover" />
                </div>
                <h3 className="text-xl font-bold">O Curioso Explorador</h3>
                <p className="text-center text-muted-foreground">
                  Os bigodes dos gatos (vibrissas) são tão sensíveis que podem detectar até mesmo as menores mudanças na
                  corrente de ar, ajudando-os a navegar no escuro e a caçar. Eles são do mesmo tamanho que a largura do
                  corpo do gato!
                </p>
                <Badge className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600">
                  #KittenFacts
                </Badge>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 transition-all hover:shadow-md">
                <div className="relative w-full aspect-square overflow-hidden rounded-lg">
                  <Image src="/images/peeking-cat.png" alt="Gato espiando pela porta" fill className="object-cover" />
                </div>
                <h3 className="text-xl font-bold">O Observador Silencioso</h3>
                <p className="text-center text-muted-foreground">
                  Os gatos passam cerca de 70% de suas vidas dormindo. Quando não estão dormindo, gastam 15-20% do tempo
                  se limpando. Eles também podem girar suas orelhas em 180 graus e ouvir sons que os humanos não
                  conseguem detectar!
                </p>
                <Badge className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600">
                  #CatBehavior
                </Badge>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  <Zap className="h-4 w-4 inline-block mr-1" /> Em alta
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Tendências do momento</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Veja o que está bombando na comunidade
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="group relative overflow-hidden rounded-lg border">
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={`/images/${i === 1 ? "chihuahua" : i === 2 ? "tabby-cat" : "tourist-dog"}.png`}
                      alt={`Post popular ${i}`}
                      width={400}
                      height={400}
                      className="h-full w-full object-cover transition-all group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">U{i}</span>
                      </div>
                      <span className="font-medium">@usuário{i}</span>
                    </div>
                    <p className="text-sm mb-2">
                      {i === 1
                        ? "Os Chihuahuas são tão pequenos que alguns cabem em bolsos, mas têm personalidades enormes! #TinyButMighty"
                        : i === 2
                          ? "Gatos podem ronronar não só quando estão felizes, mas também para se curar! A frequência do ronronar promove cura óssea e muscular. #CatHealing"
                          : "Meu Jack Russell está pronto para as férias! Vocês sabiam que essa raça foi nomeada após o Reverendo John Russell, que os criou para caça no século XIX? #DogHistory"}
                    </p>
                    <div className="flex items-center gap-4 text-muted-foreground text-sm">
                      <span className="flex items-center gap-1">
                        <PawPrint className="h-4 w-4" />
                        {100 + i * 20}
                      </span>
                      <span className="flex items-center gap-1">
                        <Feather className="h-4 w-4" />
                        {10 + i * 5}
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap className="h-4 w-4" />
                        {30 + i * 10}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {[4, 5, 6].map((i) => (
                <div key={i} className="group relative overflow-hidden rounded-lg border p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">U{i}</span>
                    </div>
                    <span className="font-medium">@usuário{i}</span>
                  </div>
                  <p className="text-sm mb-3">
                    {i === 4
                      ? "Gatinhos cinza como o meu têm uma curiosidade insaciável! Estudos mostram que gatos exploram novos ambientes de forma sistemática, mapeando rotas de fuga. Inteligentes, não? #CatIntelligence"
                      : i === 5
                        ? "Meu gato adora espiar pela porta! Sabia que os gatos têm visão noturna 6x melhor que a humana? Eles precisam de apenas 1/6 da luz que precisamos para enxergar no escuro. #NightVision"
                        : "Os cães podem detectar quando estamos tristes e tentam nos consolar. Estudos mostram que eles podem sentir nossas emoções e respondem a elas. Quem mais ama essa conexão especial? #DogEmpathy"}
                  </p>
                  <div className="flex items-center gap-4 text-muted-foreground text-sm">
                    <span className="flex items-center gap-1">
                      <PawPrint className="h-4 w-4" />
                      {50 + i * 15}
                    </span>
                    <span className="flex items-center gap-1">
                      <Feather className="h-4 w-4" />
                      {8 + i * 3}
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap className="h-4 w-4" />
                      {20 + i * 8}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Button asChild variant="outline" size="lg">
                <Link href="/explore">Ver mais</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-muted py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Hashtags populares</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore conteúdo através das hashtags mais usadas na plataforma
                </p>
              </div>
            </div>
            <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3 py-8">
              <Badge className="text-sm py-1.5 px-3 hover:bg-primary hover:text-primary-foreground cursor-pointer">
                #CachorroFofo
              </Badge>
              <Badge className="text-sm py-1.5 px-3 hover:bg-primary hover:text-primary-foreground cursor-pointer">
                #GatosDormindo
              </Badge>
              <Badge className="text-sm py-1.5 px-3 hover:bg-primary hover:text-primary-foreground cursor-pointer">
                #PetsDoDia
              </Badge>
              <Badge className="text-sm py-1.5 px-3 hover:bg-primary hover:text-primary-foreground cursor-pointer">
                #DicasDeCuidados
              </Badge>
              <Badge className="text-sm py-1.5 px-3 hover:bg-primary hover:text-primary-foreground cursor-pointer">
                #AdoteNãoCompre
              </Badge>
              <Badge className="text-sm py-1.5 px-3 hover:bg-primary hover:text-primary-foreground cursor-pointer">
                #ChihuahuaLove
              </Badge>
              <Badge className="text-sm py-1.5 px-3 hover:bg-primary hover:text-primary-foreground cursor-pointer">
                #CatIntelligence
              </Badge>
              <Badge className="text-sm py-1.5 px-3 hover:bg-primary hover:text-primary-foreground cursor-pointer">
                #DogEmpathy
              </Badge>
              <Badge className="text-sm py-1.5 px-3 hover:bg-primary hover:text-primary-foreground cursor-pointer">
                #TinyButMighty
              </Badge>
              <Badge className="text-sm py-1.5 px-3 hover:bg-primary hover:text-primary-foreground cursor-pointer">
                #PetsEngraçados
              </Badge>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
              <PawPrint className="h-4 w-4 text-white" />
            </div>
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © 2025 PawTalk. Todos os direitos reservados.
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="#" className="underline underline-offset-4 hover:text-foreground">
              Termos
            </Link>
            <Link href="#" className="underline underline-offset-4 hover:text-foreground">
              Privacidade
            </Link>
            <Link href="#" className="underline underline-offset-4 hover:text-foreground">
              Contato
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
