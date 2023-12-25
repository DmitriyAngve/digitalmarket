// Скрипт для настройки Payload CMS, используемые для определения URL-адреса сервера, административные маршруты, опции бандлера, настройки БД и тд

import { buildConfig } from "payload/config";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb"; // адаптер подключения к MongoDB
import { slateEditor } from "@payloadcms/richtext-slate"; // этот модуль для работы с редактором текста
import path from "path";

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "", // URL-адрес сервера, используемый в Payload CMS. Устанавливается как пустая строка, если в .env нет.
  // Тут будут какие-то статьи и тд
  collections: [],
  // Маршрут где будет лежать адм.панель
  routes: {
    admin: "/sell",
  },
  admin: {
    bundler: webpackBundler(),
    meta: {
      titleSuffix: "- DigitalMarket",
      favicon: "/favicon.ico",
      ogImage: "/thumbnail.jpg ",
    },
  },
  // Это ограничение на скорость запросов
  rateLimit: {
    max: 2000,
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),
  //   Установка на ограничение настройки TypeScript, включая путь к файлу вывода
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
});
