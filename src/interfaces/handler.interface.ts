import { IDto } from 'src/types/dto.type';

export interface IHandle<T extends IDto, R = void> {
  handle(dto: T): Promise<R>;
}
