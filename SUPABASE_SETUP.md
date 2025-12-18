# Supabase Setup Guide - FinControl Pro

## 📋 Passo a Passo

### 1. Criar Conta no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "Start your project"
3. Faça login com GitHub ou Google
4. Crie uma nova organização (se necessário)

### 2. Criar Novo Projeto

1. Clique em "New Project"
2. Preencha:
   - **Name**: FinControl Pro
   - **Database Password**: Escolha uma senha forte (salve em local seguro!)
   - **Region**: South America (São Paulo) - mais próximo do Brasil
   - **Pricing Plan**: Free
3. Clique em "Create new project"
4. Aguarde 2-3 minutos para o projeto ser criado

### 3. Configurar Database

1. No menu lateral, vá em **SQL Editor**
2. Clique em "New query"
3. Cole o SQL abaixo e clique em "Run":

```sql
-- Tabela de serviços (entradas)
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  description TEXT NOT NULL,
  value DECIMAL(10, 2) NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de retiradas (saídas)
CREATE TABLE withdrawals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  description TEXT NOT NULL,
  value DECIMAL(10, 2) NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX idx_services_user_id ON services(user_id);
CREATE INDEX idx_services_date ON services(date);
CREATE INDEX idx_withdrawals_user_id ON withdrawals(user_id);
CREATE INDEX idx_withdrawals_date ON withdrawals(date);

-- Row Level Security (RLS)
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE withdrawals ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança
CREATE POLICY "Users can view own services"
  ON services FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own services"
  ON services FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own services"
  ON services FOR UPDATE
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete own services"
  ON services FOR DELETE
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can view own withdrawals"
  ON withdrawals FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own withdrawals"
  ON withdrawals FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own withdrawals"
  ON withdrawals FOR UPDATE
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete own withdrawals"
  ON withdrawals FOR DELETE
  USING (auth.uid()::text = user_id);
```

4. Verifique que apareceu "Success. No rows returned"

### 4. Configurar Google OAuth

1. No menu lateral, vá em **Authentication** → **Providers**
2. Encontre "Google" na lista
3. Clique para expandir
4. **Habilite** o provider
5. Você verá duas opções:

#### Opção A - Usar credenciais do Supabase (Mais Fácil)
- Deixe marcado "Use Supabase OAuth credentials"
- Clique em "Save"
- **Pronto!** Pode pular para o passo 5

#### Opção B - Usar suas próprias credenciais (Mais Controle)
1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Crie um novo projeto ou selecione um existente
3. Vá em "APIs & Services" → "Credentials"
4. Clique em "Create Credentials" → "OAuth client ID"
5. Configure:
   - Application type: Web application
   - Name: FinControl Pro
   - Authorized redirect URIs: Cole a URL que aparece no Supabase
6. Copie o Client ID e Client Secret
7. Cole no Supabase e clique em "Save"

### 5. Obter Credenciais do Projeto

1. No menu lateral, vá em **Settings** → **API**
2. Na seção "Project URL", copie a URL (exemplo: `https://abcdefgh.supabase.co`)
3. Na seção "Project API keys", copie a chave **anon/public** (NÃO a service_role!)

### 6. Configurar Variáveis de Ambiente

1. No seu projeto local, crie um arquivo `.env.local` na raiz
2. Cole o seguinte conteúdo:

```env
VITE_SUPABASE_URL=https://seu-projeto-aqui.supabase.co
VITE_SUPABASE_ANON_KEY=sua-anon-key-aqui
```

3. Substitua os valores pelas suas credenciais do passo 5
4. Salve o arquivo

### 7. Testar Localmente

```bash
npm install
npm run dev
```

Acesse http://localhost:3000 e teste:
- Login com Google deve funcionar
- Adicionar serviços/retiradas
- Verificar no Supabase Dashboard → Table Editor se os dados aparecem

### 8. Deploy

```bash
npm run build
npm run deploy
```

## ✅ Checklist de Verificação

- [ ] Projeto criado no Supabase
- [ ] Tabelas criadas (services e withdrawals)
- [ ] Google OAuth configurado
- [ ] Credenciais copiadas
- [ ] Arquivo .env.local criado
- [ ] App testado localmente
- [ ] Login com Google funcionando
- [ ] Dados aparecendo no Supabase
- [ ] Deploy realizado

## 🆘 Problemas Comuns

### "Missing Supabase environment variables"
- Verifique se o arquivo `.env.local` existe na raiz do projeto
- Verifique se as variáveis começam com `VITE_`
- Reinicie o servidor de desenvolvimento

### Login não funciona
- Verifique se o Google OAuth está habilitado no Supabase
- Verifique se a URL de redirect está correta
- Limpe o cache do navegador

### Dados não aparecem
- Verifique se as tabelas foram criadas corretamente
- Verifique se as políticas RLS foram aplicadas
- Abra o console do navegador para ver erros

## 📞 Suporte

Se tiver problemas, me avise e eu te ajudo!
