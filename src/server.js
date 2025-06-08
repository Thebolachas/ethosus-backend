
import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());

app.post('/api/pergunta', async (req, res) => {
  const { pergunta } = req.body;

  const resultado = await prisma.perguntaResposta.findMany({
    where: {
      OR: [
        { pergunta: { contains: pergunta, mode: 'insensitive' } },
        { tags: { hasSome: pergunta.toLowerCase().split(' ') } }
      ]
    },
    take: 1
  });

  if (resultado.length > 0) {
    return res.json({ resposta: resultado[0].resposta });
  }

  return res.json({ resposta: '🤖 Reformule sua pergunta. IA ainda aprendendo com os dados internos.' });
});

app.listen(3001, () => console.log('API rodando em http://localhost:3001'));
