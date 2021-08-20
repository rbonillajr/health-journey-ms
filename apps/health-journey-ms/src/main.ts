import fastify from 'fastify';
import appService from './app';
import * as closeWithGrace from 'close-with-grace';

const app = fastify({
  logger: true,
});

app.register(appService);

const closeListeners = closeWithGrace(
  { delay: 500 },
  async ({ signal, err, manual }) => {
    if (err) {
      app.log.error(err);
    }
    await app.close();
  }
);

app.addHook('onClose', async (instance, done) => {
  closeListeners.uninstall();
  done();
});

// Start listening.
app.listen(process.env.PORT || 3000, (err: any) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
