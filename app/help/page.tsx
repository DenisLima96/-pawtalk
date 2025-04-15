"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, Search, BookOpen, MessageSquare, Shield, Settings, Users, PawPrint, Mail } from "lucide-react"
import Link from "next/link"
import { AuthCheck } from "@/components/auth-check"

const faqItems = [
  {
    id: "account",
    title: "Conta e Perfil",
    items: [
      {
        question: "Como criar um perfil para meu pet?",
        answer:
          "Para criar um perfil para seu pet, vá até a página do seu perfil, clique em 'Meus Pets' e depois em 'Adicionar Pet'. Preencha as informações solicitadas como nome, tipo de animal, raça e adicione uma foto de perfil para seu pet.",
      },
      {
        question: "Como verificar minha conta?",
        answer:
          "Contas verificadas são geralmente concedidas a figuras públicas, celebridades e marcas. Para solicitar verificação, vá em Configurações > Conta > Solicitar Verificação e siga as instruções para enviar os documentos necessários.",
      },
      {
        question: "Como alterar meu nome de usuário?",
        answer:
          "Você pode alterar seu nome de usuário em Configurações > Conta > Nome de usuário. Lembre-se que seu nome de usuário deve ser único e, uma vez alterado, seu URL de perfil também mudará.",
      },
      {
        question: "Posso ter múltiplos perfis de pets vinculados à minha conta?",
        answer:
          "Sim! Você pode adicionar quantos pets quiser ao seu perfil. Cada pet terá seu próprio perfil, mas todos estarão vinculados à sua conta principal.",
      },
    ],
  },
  {
    id: "posts",
    title: "Publicações e Conteúdo",
    items: [
      {
        question: "Como fazer um Repawst?",
        answer:
          "Para fazer um Repawst, encontre a publicação que deseja compartilhar, clique no ícone de raio (Repawst) abaixo da publicação e confirme. Você também pode adicionar um comentário ao seu Repawst antes de compartilhá-lo.",
      },
      {
        question: "Quais tipos de conteúdo posso publicar?",
        answer:
          "No PawTalk, você pode publicar fotos, textos ou uma combinação de ambos. Recomendamos conteúdo relacionado a animais de estimação, mas você também pode compartilhar outros assuntos de interesse para a comunidade pet.",
      },
      {
        question: "Como usar hashtags de forma eficaz?",
        answer:
          "Use hashtags relevantes para aumentar a visibilidade do seu conteúdo. Hashtags populares como #AdoteNãoCompre, #CachorroFofo ou #GatosDoDia podem ajudar mais pessoas a encontrar suas publicações. Você pode usar até 10 hashtags por publicação.",
      },
      {
        question: "Como editar ou excluir uma publicação?",
        answer:
          "Para editar ou excluir uma publicação, clique nos três pontos (...) no canto superior direito da publicação e selecione 'Editar' ou 'Excluir'. Note que algumas informações, como imagens, não podem ser editadas após a publicação.",
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacidade e Segurança",
    items: [
      {
        question: "Como tornar minha conta privada?",
        answer:
          "Para tornar sua conta privada, vá em Configurações > Privacidade > Conta Privada e ative a opção. Quando sua conta é privada, apenas seguidores aprovados podem ver suas publicações e histórias.",
      },
      {
        question: "Como bloquear outro usuário?",
        answer:
          "Para bloquear um usuário, visite o perfil dele, clique nos três pontos (...) no canto superior direito e selecione 'Bloquear'. Usuários bloqueados não poderão ver seu perfil, publicações ou enviar mensagens para você.",
      },
      {
        question: "Quem pode ver minhas publicações?",
        answer:
          "Se sua conta for pública, qualquer pessoa pode ver suas publicações. Se for privada, apenas seus seguidores aprovados podem vê-las. Você também pode ajustar configurações específicas de privacidade para cada publicação.",
      },
      {
        question: "Como denunciar conteúdo inadequado?",
        answer:
          "Para denunciar conteúdo que viola nossas diretrizes, clique nos três pontos (...) na publicação, comentário ou perfil e selecione 'Denunciar'. Escolha o motivo da denúncia e nossa equipe irá revisar o conteúdo.",
      },
    ],
  },
  {
    id: "features",
    title: "Recursos e Funcionalidades",
    items: [
      {
        question: "O que são comunidades no PawTalk?",
        answer:
          "Comunidades são grupos temáticos onde usuários com interesses semelhantes podem compartilhar conteúdo e interagir. Existem comunidades para diferentes tipos de pets, raças específicas, dicas de cuidados e muito mais.",
      },
      {
        question: "Como usar o recurso de mensagens diretas?",
        answer:
          "Para enviar uma mensagem direta, vá até o perfil do usuário e clique no ícone de mensagem, ou acesse a seção de Mensagens no menu principal e inicie uma nova conversa. Você pode enviar texto, fotos e emojis.",
      },
      {
        question: "Como salvar publicações para ver mais tarde?",
        answer:
          "Para salvar uma publicação, clique no ícone de marcador abaixo da publicação. Todas as publicações salvas podem ser encontradas na seção 'Salvos' do seu perfil, organizadas por categorias.",
      },
      {
        question: "O que são Repawsts e como funcionam?",
        answer:
          "Repawsts são semelhantes aos retweets do Twitter. Eles permitem que você compartilhe publicações de outros usuários com seus seguidores, mantendo a atribuição ao autor original. É uma ótima maneira de divulgar conteúdo que você gosta.",
      },
    ],
  },
]

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("faq")

  const filteredFaq = faqItems
    .map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.items.length > 0)

  return (
    <AuthCheck>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Central de Ajuda</h1>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por dúvidas, problemas ou recursos..."
            className="pl-10 py-6 text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs defaultValue="faq" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <span>Perguntas Frequentes</span>
            </TabsTrigger>
            <TabsTrigger value="guides" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Guias e Tutoriais</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Contato</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="faq">
            {searchTerm && filteredFaq.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <HelpCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Nenhum resultado encontrado</h3>
                <p className="text-muted-foreground mb-6">
                  Não encontramos respostas para sua pesquisa. Tente termos diferentes ou entre em contato conosco.
                </p>
                <Button onClick={() => setActiveTab("contact")}>Entrar em contato</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(searchTerm ? filteredFaq : faqItems).map((category) => (
                  <Card key={category.id}>
                    <CardHeader>
                      <CardTitle>{category.title}</CardTitle>
                      <CardDescription>
                        Respostas para as dúvidas mais comuns sobre {category.title.toLowerCase()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {category.items.map((item, index) => (
                          <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                            <AccordionContent>{item.answer}</AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="guides">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Primeiros passos</CardTitle>
                  <CardDescription>Guias para começar a usar o PawTalk</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>
                      <Link href="#" className="text-primary hover:underline flex items-center gap-2">
                        <PawPrint className="h-4 w-4" />
                        <span>Como criar sua conta</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-primary hover:underline flex items-center gap-2">
                        <PawPrint className="h-4 w-4" />
                        <span>Configurando seu perfil</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-primary hover:underline flex items-center gap-2">
                        <PawPrint className="h-4 w-4" />
                        <span>Criando perfis para seus pets</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-primary hover:underline flex items-center gap-2">
                        <PawPrint className="h-4 w-4" />
                        <span>Fazendo sua primeira publicação</span>
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recursos avançados</CardTitle>
                  <CardDescription>Aprenda a usar todos os recursos do PawTalk</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>
                      <Link href="#" className="text-primary hover:underline flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>Criando e gerenciando comunidades</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-primary hover:underline flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        <span>Personalizando sua experiência</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-primary hover:underline flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        <span>Configurações de privacidade</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-primary hover:underline flex items-center gap-2">
                        <PawPrint className="h-4 w-4" />
                        <span>Usando hashtags efetivamente</span>
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Para empresas</CardTitle>
                  <CardDescription>Recursos para petshops e empresas do setor pet</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>
                      <Link href="#" className="text-primary hover:underline flex items-center gap-2">
                        <PawPrint className="h-4 w-4" />
                        <span>Criando um perfil comercial</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-primary hover:underline flex items-center gap-2">
                        <PawPrint className="h-4 w-4" />
                        <span>Estratégias de engajamento</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-primary hover:underline flex items-center gap-2">
                        <PawPrint className="h-4 w-4" />
                        <span>Analisando métricas e insights</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-primary hover:underline flex items-center gap-2">
                        <PawPrint className="h-4 w-4" />
                        <span>Promovendo produtos e serviços</span>
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contact">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Entre em contato</CardTitle>
                  <CardDescription>Preencha o formulário abaixo para enviar sua mensagem</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Nome
                        </label>
                        <Input id="name" placeholder="Seu nome" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input id="email" type="email" placeholder="seu@email.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Assunto
                      </label>
                      <Input id="subject" placeholder="Assunto da mensagem" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Mensagem
                      </label>
                      <textarea
                        id="message"
                        className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Descreva sua dúvida ou problema em detalhes"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Enviar mensagem
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações de contato</CardTitle>
                    <CardDescription>Outras formas de entrar em contato conosco</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-sm text-muted-foreground">suporte@pawtalk.com</p>
                        <p className="text-sm text-muted-foreground">Respondemos em até 24 horas</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Chat ao vivo</h3>
                        <p className="text-sm text-muted-foreground">Disponível de segunda a sexta</p>
                        <p className="text-sm text-muted-foreground">Das 9h às 18h</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <HelpCircle className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Base de conhecimento</h3>
                        <p className="text-sm text-muted-foreground">Acesse nossa documentação completa</p>
                        <Link href="#" className="text-sm text-primary hover:underline">
                          docs.pawtalk.com
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Perguntas frequentes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>Qual é o tempo médio de resposta?</AccordionTrigger>
                        <AccordionContent>
                          Respondemos a maioria das mensagens em até 24 horas em dias úteis. Para assuntos urgentes,
                          recomendamos usar o chat ao vivo durante o horário comercial.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>Como reportar um bug ou problema técnico?</AccordionTrigger>
                        <AccordionContent>
                          Para reportar bugs ou problemas técnicos, use o formulário de contato e selecione "Problema
                          técnico" como assunto. Inclua detalhes como seu dispositivo, navegador e passos para
                          reproduzir o problema.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger>Vocês aceitam sugestões de novos recursos?</AccordionTrigger>
                        <AccordionContent>
                          Sim! Adoramos ouvir sugestões dos nossos usuários. Você pode enviar suas ideias através do
                          formulário de contato ou participar do nosso programa de feedback na comunidade "PawTalk
                          Feedback".
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AuthCheck>
  )
}
