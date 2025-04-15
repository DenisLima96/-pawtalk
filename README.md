# PawTalk - Rede Social para Amantes de Pets

![Image](https://github.com/user-attachments/assets/a9db95e7-fd5d-470d-8c62-13da8d02fa7c)

PawTalk é uma rede social inovadora que combina elementos do Instagram e Twitter (X), especialmente projetada para amantes de animais. A plataforma permite que usuários, pets (através de seus donos) e empresas do setor pet compartilhem fotos, pensamentos e interajam em uma comunidade dedicada ao mundo animal.

## 🌟 Características

- **Feed Misto**: Combine fotos e textos em um único feed, semelhante ao Instagram e Twitter
- **Perfis para Todos**: Crie perfis para você, seus pets e sua empresa
- **Repawsts**: Compartilhe publicações de outros usuários (similar aos retweets)
- **Hashtags**: Organize e descubra conteúdo através de hashtags populares
- **Modo Escuro**: Interface adaptável com suporte a tema claro e escuro
- **Design Responsivo**: Experiência otimizada para dispositivos móveis e desktop

## 🚀 Tecnologias Utilizadas

- **Next.js 14**: Framework React com App Router
- **React 18**: Biblioteca para construção de interfaces
- **TypeScript**: Tipagem estática para JavaScript
- **Tailwind CSS**: Framework CSS utilitário
- **Shadcn/UI**: Componentes de UI reutilizáveis
- **Framer Motion**: Animações fluidas
- **Lucide React**: Ícones modernos e personalizáveis

## 📱 Funcionalidades Principais

### Para Usuários Humanos
- Compartilhar fotos e pensamentos sobre seus pets
- Seguir outros amantes de animais
- Interagir com conteúdo através de curtidas, comentários e repawsts
- Salvar publicações favoritas

### Para Perfis de Pets
- Perfis dedicados para animais de estimação
- Publicações "escritas" na perspectiva do pet
- Conexão com o perfil do dono

### Para Empresas do Setor Pet
- Perfis verificados para empresas e profissionais
- Compartilhar dicas, promoções e conteúdo educativo
- Interagir com potenciais clientes

## 📂 Estrutura do Projeto

\`\`\`
pawtalk/
├── app/                  # Rotas e páginas da aplicação
│   ├── feed/             # Feed principal
│   ├── explore/          # Página de exploração
│   ├── profile/          # Perfil de usuário
│   ├── post/             # Visualização de posts
│   ├── login/            # Autenticação
│   └── register/         # Registro de usuários
├── components/           # Componentes reutilizáveis
│   ├── ui/               # Componentes de UI básicos (shadcn)
│   ├── main-feed.tsx     # Feed principal
│   ├── who-to-follow.tsx # Sugestões de perfis
│   └── ...               # Outros componentes
├── public/               # Arquivos estáticos e imagens
│   └── images/           # Imagens do site
└── ...
\`\`\`

## 🖥️ Como Executar

1. Clone o repositório:
\`\`\`bash
git clone https://github.com/seu-usuario/pawtalk.git
cd pawtalk
\`\`\`

2. Instale as dependências:
\`\`\`bash
npm install
# ou
yarn install
# ou
pnpm install
\`\`\`

3. Execute o servidor de desenvolvimento:
\`\`\`bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
\`\`\`

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.


## 🔮 Funcionalidades Futuras

- Sistema de mensagens diretas entre usuários
- Marketplace para produtos pet
- Integração com serviços de adoção
- Eventos e encontros para pets
- Recursos de geolocalização para encontrar pets e serviços próximos

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Créditos

- Imagens: [Pixabay](https://pixabay.com/) - Banco de imagens gratuitas e livres de royalties
- Ícones: [Lucide React](https://lucide.dev/)
- UI Components: [shadcn/ui](https://ui.shadcn.com/)

---

Desenvolvido  por Denis Lima  - 2025
