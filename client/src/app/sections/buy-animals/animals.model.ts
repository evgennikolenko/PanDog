export class Animals {
    constructor(
        public id : number,
        public src : string,
        public type : string,
        public breed : string,
        public age : number,
        public cost : number,
        public available : boolean,
        public location : string,
        public discount : number,
    ){}
}

export class Animal {
    constructor(
        public id : number,
        public src : string,
        public type : string,
        public breed : string,
        public age : number,
        public cost : number,
        public available : boolean,
        public location : string,
        public discount : number,
        public reviews: Object,
    ){}
}