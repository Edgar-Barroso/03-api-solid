export class MaxNumberOfCheckInsError extends Error{
    constructor(){
        super('Max number of checks-ins reached.')
    }
}