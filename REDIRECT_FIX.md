# Correção de Redirecionamento (Erro localhost)

O Supabase está te mandando para o `localhost` porque a URL do seu site não está na lista de permitidos. Vamos corrigir isso rapidinho!

## 🚀 Passo a Passo

1. Acesse o painel do Supabase: [https://supabase.com/dashboard/project/cjdfrjppykvzcfexmrdv/auth/url-configuration](https://supabase.com/dashboard/project/cjdfrjppykvzcfexmrdv/auth/url-configuration)
   *(Se o link não abrir direto, vá em **Authentication** -> **URL Configuration**)*

2. Em **Site URL**, coloque:
   `https://alexmetaloide.github.io/Financ2/`

3. Em **Redirect URLs**, clique em **"Add URL"** e adicione:
   `https://alexmetaloide.github.io/Financ2/`
   
   *(Adicione também `http://localhost:3000` se quiser testar no seu computador)*

4. Clique em **Save**.

---

## 🔄 Teste Final
1. Volte para o seu site: [https://alexmetaloide.github.io/Financ2/](https://alexmetaloide.github.io/Financ2/)
2. Tente fazer login novamente.
3. Agora ele deve voltar para a página certa!
