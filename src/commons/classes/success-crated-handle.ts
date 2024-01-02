export class SuccessCreatedHandle {
    public readonly status = 201;
    constructor(
        public readonly message: string
    ) {}
}