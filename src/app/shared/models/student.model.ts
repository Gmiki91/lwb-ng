export type Student ={
    _id?:string
    fullNameC:string;
    fullNameL:string;
    dob:Date;
    currentGrade:number;
    email:string;
    address:string;
    phone:string;
    pgName:string;
    ukraineSchool:string;
    healthIssues:string[];
    vegetarian:boolean;
    homeGoing:boolean;
    archived:boolean;
    registeredAt:number;
    missedClassAt:number[];
    foodOrderedFor:number[];
    gradeBook?:GradeBook[];
}
export type Result={
    date:number;
    topics:string[];
    mark?:number;
    textAssesment?:string;
    note?:string;
    type?:string;
    updatedBy:string;
    deleted:boolean;
}
export type StudentResult={
    _id:string;
    fullNameC:string;
    fullNameL:string;
    results:Result[];
}
export type GradeBook ={
    grade:number;
    subject:string;
    results:Result[];
}