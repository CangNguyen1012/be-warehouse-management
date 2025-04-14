/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createLogger, transports, format } from 'winston';

export const appLogger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json(),
  ),
  transports: [new transports.Console()],
});
