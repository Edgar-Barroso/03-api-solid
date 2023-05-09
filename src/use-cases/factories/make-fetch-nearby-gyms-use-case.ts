import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";


export function makeFetchNearbyGymsUseCase(){
    const prismaGymsRepository = new PrismaGymsRepository();
    const fetchNearbyGymsUseCase =  new FetchNearbyGymsUseCase(prismaGymsRepository);
    return fetchNearbyGymsUseCase;
}