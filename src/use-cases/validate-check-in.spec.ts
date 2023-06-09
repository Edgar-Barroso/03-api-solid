import { InMemoryChekcInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { LateCheckInValidationError } from "./errors/late-check-in-validation-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { ValidateCheckInUseCase } from "./validate-check-in";

export { test } from "vitest";

let checkInRepository: InMemoryChekcInsRepository;
let sut: ValidateCheckInUseCase;

describe("Validate Check-In Use Case", () => {
    beforeEach(async () => {
        checkInRepository = new InMemoryChekcInsRepository();
        sut = new ValidateCheckInUseCase(checkInRepository);

        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("should be able to validate check-in", async () => {
        const createdCheckIn = await checkInRepository.create({
            gym_id: "gym-01",
            user_id: "user-01",
        });

        const { checkIn } = await sut.execute({
            checkInId: createdCheckIn.id,
        });
        expect(checkIn.validated_at).toEqual(expect.any(Date));
        expect(checkInRepository.items[0].validated_at).toEqual(
            expect.any(Date)
        );
    });

    it("should not be able to validate an inexistent check-in", async () => {
        await expect(() =>
            sut.execute({
                checkInId: "inexistent-check-in-id",
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });

    it("should not be able to validate the check-in after 20 minutos of its creation", async () => {
        vi.setSystemTime(new Date(2023, 0, 1, 13, 40));
        const createdCheckIn = await checkInRepository.create({
            gym_id: "gym-01",
            user_id: "user-01",
        });

        const twentyOneMinutesInMs = 1000 * 60 * 21;
        vi.advanceTimersByTime(twentyOneMinutesInMs);

        await expect(() =>
            sut.execute({
                checkInId: createdCheckIn.id,
            })
        ).rejects.toBeInstanceOf(LateCheckInValidationError);
    });
});
