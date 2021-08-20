import fp from 'fastify-plugin';
import fastifyCors from 'fastify-cors';

export default fp(async (fastify) => {
  void fastify.register(fastifyCors, { origin: '*', methods: ['POST', 'GET'] });
});
