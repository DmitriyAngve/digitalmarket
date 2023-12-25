// Этот скрипт использует Express для создания веб-сервера и интегрирует его с клиентом Paylad CMS для настройки административной панели
import express from "express";
import { getPayloadClient } from "./get-payload";
import { nextApp, nextHandler } from "./next-utils";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Ф-ия запускается при выполнении скрипта, инициализирует клиент Payload CMS, передавая в ф-ию getPayloadClient параметры инициализации, включая Express. D a-bb "onInit" происходит логирование информации о URL административной панели, предоставляемой Payload CMS
const start = async () => {
  // admin dashboard (provided by payload CMS)
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL ${cms.getAdminURL()}`);
      },
    },
  });

  app.use((req, res) => nextHandler(req, res)); // for serverless

  nextApp.prepare().then(() => {
    payload.logger.info("Next.js started");

    app.listen(PORT, async () => {
      payload.logger.info(
        `Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`
      );
    });
  });
};

// Запускаю (не забыть!)
start();
