import dotenv from "dotenv"; // Модуль, загружающий переменные окружения (env. в process.env)
import path from "path"; // Модуль path из Node.js для работы с путями к файлам и каталогам
import type { InitOptions } from "payload/config"; // тип я указал в интерфейсе
import payload from "payload";

// Вызывается ф-ия для загрузки переменных окружения из файла .env, находящегося в каталоге ../env
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

// Реализация механизма кеширования. Он позволяет гарантировать инициализацию клиента Payload только один раз и повторное использование на последующих вызовах
let cached = (global as any).payload; // кеширование хранится в глобальной области видимости

if (!cached) {
  cached = (global as any).payload = {
    client: null,
    promise: null,
  };
}

interface Args {
  initOptions?: Partial<InitOptions>;
}

// Ф-ия возвращает инициализированный клиент Payload
export const getPayloadClient = async ({ initOptions }: Args = {}) => {
  // Проверка, установлен ли PAYLOAD_SECRET в переменных окружения
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error("PAYLOAD_SECRET is missing");
  }

  // Возвращает кешированный клиент, если он существует
  if (cached.client) {
    return cached.client;
  }

  // Если промис для инициализации клиента не существует, инициализирует Payload с предоставленными параметрами
  if (!cached.promise) {
    cached.promise = payload.init({
      secret: process.env.PAYLOAD_SECRET,
      local: initOptions?.express ? false : true,
      ...(initOptions || {}),
    });
  }

  // Затем кеширует и возвращает клиент
  try {
    cached.client = await cached.promise;
  } catch (e: unknown) {
    cached.promise = null;
    throw e;
  }

  return cached.client;
};

// В общем, этот скрипт настраивает и кеширует клиент для системы управления контентом Payload, гарантируя его инициализацию только один раз и повторное использование при последующих вызовах. Инициализация клиента зависит от предоставленной переменной окружения PAYLOAD_SECRET
