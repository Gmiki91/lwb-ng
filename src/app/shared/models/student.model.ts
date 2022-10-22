export type Student ={
    _id?:string
    fullNameC:string;
    fullNameL:string;
    dob:Date;
    currentGrade:number;
    parentName:string;
    address:string;
    phoneNumber:string;
    ukraineSchool:string;
    healthIssues:string[];
    vegetarian:boolean;
    homeGoing:boolean;
    archived:boolean;
    registeredAt:number;
    notes?:string;
    missedClassAt:number[];
    foodOrderedFor:number[];
    gradeBook?:GradeBook[];
}
export type Result={
    date:number;
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