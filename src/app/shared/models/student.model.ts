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
    missedClassAt:number[];
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
type GradeBook ={
    grade:number;
    subject:string;
    results:Result[];
}