import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Topic } from "../models/topic";

@Injectable({ providedIn: 'root' })

export class TopicService {
    topicList: Subject<Topic[]>=new Subject();
    constructor(private http: HttpClient) { }

    addTopic(topic: Topic) {
        this.http.post<{ status: string }>(`${environment.url}/topics/`, topic)
            .subscribe(() => this.requestTopics(topic.subject, topic.grade));
    }

    requestTopics(subject: string, grade: number): void {
        this.http.get<{ status: string, topics: Topic[] }>(`${environment.url}/topics/${subject}/${grade}`)
            .pipe(map(result => result.topics.sort((a, b) => a.lesson - b.lesson)))
            .subscribe(result => this.topicList.next(result))

    }

    deleteTopic(topic: Topic) {
        this.http.delete<{ status: string }>(`${environment.url}/topics/${topic._id}`)
            .subscribe(() => this.requestTopics(topic.subject, topic.grade));
    }

    getTopics(): Observable<Topic[]> {
        return this.topicList.asObservable();
    }
}