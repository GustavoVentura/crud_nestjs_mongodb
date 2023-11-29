import { SetMetadata } from "@nestjs/common";

export const Is_PUBLIC_KEY = 'isPublic';
export const IsPublic = () => SetMetadata(Is_PUBLIC_KEY, true);