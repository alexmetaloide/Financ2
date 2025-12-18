# Configuração do Google Cloud para Login

Se o Supabase não permite usar as credenciais padrão, precisamos criar as nossas próprias no Google. É um pouco mais longo, mas funciona 100%.

## 📋 Dados Necessários
Antes de começar, saiba que você vai precisar desta URL (copie ela):
`https://cjdfrjppykvzcfexmrdv.supabase.co/auth/v1/callback`

---

## 🚀 Passo a Passo

### 1. Criar Projeto no Google Cloud
1. Acesse [console.cloud.google.com](https://console.cloud.google.com)
2. Faça login com sua conta Google
3. No topo, clique em **"Selecione um projeto"** (ou no nome do projeto atual)
4. Clique em **"Novo Projeto"**
5. Nome: `FinControl Pro`
6. Clique em **"Criar"**

### 2. Configurar Tela de Consentimento
1. No menu lateral, vá em **"APIs e Serviços"** -> **"Tela de permissão OAuth"**
2. Selecione **"Externo"** e clique em **"Criar"**
3. Preencha:
   - **Nome do App**: `FinControl Pro`
   - **Email de suporte**: Seu email
   - **Email do desenvolvedor**: Seu email
4. Clique em **"Salvar e Continuar"** até chegar no fim (não precisa adicionar escopos ou usuários de teste agora)
5. Clique em **"Voltar para o Painel"**

### 3. Criar Credenciais
1. No menu lateral, clique em **"Credenciais"**
2. Clique em **"Criar Credenciais"** (topo) -> **"ID do cliente OAuth"**
3. **Tipo de aplicativo**: Escolha **"Aplicação Web"**
4. **Nome**: `FinControl Pro Web`
5. Em **"Origens JavaScript autorizadas"**, adicione:
   - `https://alexmetaloide.github.io`
6. Em **"URIs de redirecionamento autorizados"**, adicione a URL que você copiou no início:
   - `https://cjdfrjppykvzcfexmrdv.supabase.co/auth/v1/callback`
7. Clique em **"Criar"**

### 4. Copiar e Colar no Supabase
Vai aparecer uma janela com duas chaves. Copie elas e cole no Supabase:

1. **Seu ID de cliente** -> Cole no campo **"Client ID"** do Supabase
2. **Sua chave secreta** -> Cole no campo **"Client Secret"** do Supabase

### 5. Finalizar
1. No Supabase, clique em **"Save"**
2. Pronto! Agora o login deve funcionar.
