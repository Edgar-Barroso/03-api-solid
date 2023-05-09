import { InMemoryChekcInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { GetUserMetricsUseCase } from "./get-user-metrics";

export { test } from "vitest";

let checkInsRepository: InMemoryChekcInsRepository;
let sut: GetUserMetricsUseCase;

describe("Get User Metrics Use Case", () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryChekcInsRepository();
        sut = new GetUserMetricsUseCase(checkInsRepository);
    });

    it("should not be able to count check ins", async () => {
        await checkInsRepository.create({
            gym_id: "gym-01",
            user_id: "user-01",
        });

        await checkInsRepository.create({
            gym_id: "gym-02",
            user_id: "user-01",
        });

        const { checkInsCount } = await sut.execute({
            userId: "user-01",
        });

        expect(checkInsCount).toEqual(2);
    });
});
