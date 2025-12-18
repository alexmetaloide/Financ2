-- Atualização das tabelas para corresponder ao App

-- Adicionar colunas faltantes na tabela services
ALTER TABLE services 
ADD COLUMN IF NOT EXISTS client TEXT,
ADD COLUMN IF NOT EXISTS status TEXT,
ADD COLUMN IF NOT EXISTS end_date DATE;

-- Adicionar colunas faltantes na tabela withdrawals
ALTER TABLE withdrawals 
ADD COLUMN IF NOT EXISTS category TEXT;

-- Remover a restrição NOT NULL de description se necessário (opcional, mas seguro)
ALTER TABLE services ALTER COLUMN description DROP NOT NULL;
ALTER TABLE withdrawals ALTER COLUMN description DROP NOT NULL;
