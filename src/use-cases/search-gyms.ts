import { Gym, User } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface SearchGymsUseCaseRequest {
    query: string;
    page:number;
}

interface SearchGymsUseCaseResponse {
    gyms: Gym[];
}

export class SearchGymsUseCase {
    #gymsRepository: GymsRepository;
    constructor(gymsRepository: GymsRepository) {
        this.#gymsRepository = gymsRepository;
    }
    async execute({
        query,
        page,
    }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
        const gyms = await this.#gymsRepository.searchMany(query,page);

        return { gyms, };
    }
}
