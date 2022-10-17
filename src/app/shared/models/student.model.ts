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
    registeredAt:number;
    notes?:string;
    missedClassAt:number[];
    foodOrderedFor:number[];
    gradeBook?:GradeBook[];
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
export type GradeBook ={
    grade:number;
    subject:string;
    results:Result[];
}