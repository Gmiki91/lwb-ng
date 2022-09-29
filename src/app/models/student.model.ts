export type Student ={
    _id?:string
    fullNameC:string;
    fullNameL:string;
    dob:Date;
    currentGrade:number;
    ukraineSchool:string;
    healthIssues:string[];
    vegetarian:boolean;
    registeredAt:number;
    notes?:string;
    attendance?:boolean;
}
export type Result={
    date:number;
    mark:number;
    note:string;
    type:string;
}
export type StudentResult={
    _id:string;
    fullNameC:string;
    results:Result[];
}